import * as express from "express";
import {inject, injectable} from "inversify";
import {REPOSITORIES} from "../repositories";
import IUserRepository from "../Repositories/Contracts/IUserRepository";
import AuthPayload from "../Payloads/Auth/AuthPayload";
import TokenFactory from "../Lib/Factories/TokenFactory";
import IEncryptionStrategy from "../Lib/Encryption/IEncryptionStrategy";
import ErrorException from "../Lib/ErrorException";
import StatusCode from "../Lib/StatusCode";
import IToken from "../Lib/Auth/IToken";
import jwt from "jwt-simple";
import KeepAlivePayload from "../Payloads/Auth/KeepAlivePayload";
import Config from "../../config/config";
import ForgotPasswordPayload from "../Payloads/Auth/ForgotPasswordPayload";
import ChangeForgotPasswordPayload from "../Payloads/Auth/ChangeForgotPasswordPayload";
import Mail from "../Lib/Mail/Mail";
import EncryptionFactory from "../Lib/Factories/EncryptionFactory";

@injectable()
class AuthService
{
    private encryption: IEncryptionStrategy;
    private repository: IUserRepository;
    private tokenFactory: TokenFactory;

    constructor(@inject(REPOSITORIES.IUserRepository) repository: IUserRepository)
    {
        this.repository = repository;
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
        
        return await this.tokenFactory.token(user);
    }

    public static decodeToken (token: string): any
    {
        let TokenArray = token.split(" ");

        let secret = String(Config.jwt.secret);
        
        return jwt.decode(TokenArray[1], secret, false, 'HS512');
    }

    public static getLoggedId(request: express.Request): string
    {
        const tokenDecoded = AuthService.decodeToken(request.get('Authorization'));

        return tokenDecoded.userId;
    }


    public static getLoggedEmail(request: express.Request): string
    {
        const tokenDecoded = AuthService.decodeToken(request.get('Authorization'));

        return tokenDecoded.email;
    }

    public async regenerateToken (request: KeepAlivePayload): Promise<IToken>
    {
        const email = request.email();

        const user = await this.repository.getOneByEmail(email);

        return await this.tokenFactory.token(user);
    }

    public async forgotPassword (payload: ForgotPasswordPayload): Promise<any>
    {
        const user = await this.repository.getOneByEmail(payload.email());

        user.confirmationToken = String(await payload.confirmationToken());
        user.passwordRequestedAt = payload.passwordRequestedAT();

        let updateUser = await this.repository.update(user);

        let urlConfirmationToken = Config.url.urlWeb + 'changeForgotPassword/' + user.confirmationToken;
        let senderName = String(Config.mail.senderName);
        let from = String(Config.mail.senderEmailDefault);
        let to = payload.email();
        let cc = "";
        let subject = "Password Recovery";
        let html = `<!DOCTYPE html>
                        <html>
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

        const userUpdate = await this.repository.update(user);

        return {message: "Your password has been changed"};
    }

}

export default AuthService;