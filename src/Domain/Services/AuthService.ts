import * as express from "express";
import {inject, injectable} from "inversify";
import {REPOSITORIES} from "../../repositories";
import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import AuthPayload from "../../InterfaceAdapters/Payloads/Auth/AuthPayload";
import TokenFactory from "../../Lib/Factories/TokenFactory";
import IEncryptionStrategy from "../../Lib/Encryption/IEncryptionStrategy";
import ErrorException from "../../Lib/ErrorException";
import StatusCode from "../../Lib/StatusCode";
import IToken from "../../Lib/Auth/IToken";
import jwt from "jwt-simple";
import KeepAlivePayload from "../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload";
import Config from "config";
import ForgotPasswordPayload from "../../InterfaceAdapters/Payloads/Auth/ForgotPasswordPayload";
import ChangeForgotPasswordPayload from "../../InterfaceAdapters/Payloads/Auth/ChangeForgotPasswordPayload";
import Mail from "../../Lib/Mail/Mail";
import EncryptionFactory from "../../Lib/Factories/EncryptionFactory";
import IAuthService from "../../InterfaceAdapters/IServices/IAuthService";

@injectable()
class AuthService implements IAuthService
{
    @inject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    private encryption: IEncryptionStrategy;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
    }

    public async login (payload: AuthPayload): Promise<IToken>
    {
        const email = payload.email();
        const password = payload.password();
        const user =  await this.repository.getOneByEmail(email);

        if(user.enable === false)
        {
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'Your user is disable');
        }

        if (! await this.encryption.compare(password, user.password))
        {
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'Error credentials');
        }
        
        return this.tokenFactory.token(user);
    }

    public decodeToken (token: string): any
    {
        let TokenArray = token.split(" ");

        let secret: string = Config.get('jwt.secret');
        
        return jwt.decode(TokenArray[1], secret, false, 'HS512');
    }

    public getLoggedId(request: express.Request): string
    {
        const tokenDecoded = this.decodeToken(request.get('Authorization'));

        return tokenDecoded.userId;
    }

    public getLoggedEmail(request: express.Request): string
    {
        const tokenDecoded = this.decodeToken(request.get('Authorization'));

        return tokenDecoded.email;
    }

    public async regenerateToken (request: KeepAlivePayload): Promise<IToken>
    {
        const email = request.email();

        const user = await this.repository.getOneByEmail(email);

        return this.tokenFactory.token(user);
    }

    public async forgotPassword (payload: ForgotPasswordPayload): Promise<any>
    {
        const user = await this.repository.getOneByEmail(payload.email());

        user.confirmationToken = String(await payload.confirmationToken());
        user.passwordRequestedAt = payload.passwordRequestedAT();

        await this.repository.update(user);

        let urlConfirmationToken: string = Config.get('url.urlWeb') + 'changeForgotPassword/' + user.confirmationToken;
        let senderName: string = Config.get('mail.senderName');
        let from: string = Config.get('mail.senderEmailDefault');
        let to = payload.email();
        let cc = "";
        let subject = "Password Recovery";
        let html = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <title></title>
                        </head>
                        <body>
                            <p>Hello</p>
                            <p>You can change your pass from this <a href="${urlConfirmationToken}" target="_blank">link</a></p>
                            <br>
                            <br>
                            <p>Cheers,</p>
                            <p>The team</p>
                        </body>
                        </html>`;

        let mail = new Mail(senderName, from, to, cc, subject, html);
        let sendMailer = await mail.sendMail();

        return {message: "We've sent you an email"};
    }

    public async changeForgotPassword (payload: ChangeForgotPasswordPayload): Promise<any>
    {
        const confirmationToken = payload.confirmationToken();

        const user = await this.repository.getOneByConfirmationToken(confirmationToken);
        user.confirmationToken = null;
        user.passwordRequestedAt = null;
        user.password = await payload.password();

        await this.repository.update(user);

        return {message: "Your password has been changed"};
    }

}

export default AuthService;