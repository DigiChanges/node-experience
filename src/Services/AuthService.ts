import {inject, injectable} from "inversify";
import {REPOSITORIES} from "../repositories";
import IUserRepository from "../Repositories/Contracts/IUserRepository";
import AuthPayload from "../Payloads/Auth/AuthPayload";
import TokenFactory from "../Lib/Factories/TokenFactory";
import IEncription from "../Lib/Encription/IEncription";
import {TYPES} from "../types";
import ErrorException from "../Lib/ErrorException";
import StatusCode from "../Lib/StatusCode";
import IToken from "../Lib/Auth/IToken";
import jwt from "jwt-simple";
import Config from "../../config/config";
import ForgotPasswordPayload from "../Payloads/Auth/ForgotPasswordPayload";
import Mail from "../Lib/Mail/Mail";

@injectable()
class AuthService
{
    @inject(TYPES.IEncription)
    private encryptionHandler: IEncription;
    private repository: IUserRepository;
    private tokenFactory: TokenFactory;

    constructor(@inject(REPOSITORIES.IUserRepository) repository: IUserRepository)
    {
        this.repository = repository;
        this.tokenFactory = new TokenFactory();
    }

    public async login (payload: AuthPayload): Promise<IToken>
    {
        const email = payload.email();
        const password = payload.password();
        const user =  await this.repository.getOneByEmail(email);

        if (!this.encryptionHandler.compare(password, user.password))
        {
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'Error credentials');
        }
        
        return await this.tokenFactory.token(user);
    }

    static decodeToken (token: string): any
    {
        let TokenArray = token.split(" ");

        let secret = String(Config.jwt.secret);
        
        return jwt.decode(TokenArray[1], secret);
    }

    public async regenerateToken (email: string): Promise<IToken>
    {
        const user =  await this.repository.getOneByEmail(email);

        return await this.tokenFactory.token(user);
    }

    public async forgotPassword (payload: ForgotPasswordPayload): Promise<any>
    {
        const user =  await this.repository.getOneByEmail(payload.email());

        user.confirmationToken = String(await payload.confirmationToken());
        user.passwordRequestedAt = payload.passwordRequestedAT();

        let updateUser = await this.repository.update(user);

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
                            <p>You can change your pass from this <a href="" target="_blank">link</a></p>
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

}

export default AuthService;