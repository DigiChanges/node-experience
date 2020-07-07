import * as express from "express";
import {injectable} from "inversify";
import TokenFactory from "../../Infrastructure/Factories/TokenFactory";
import IEncryptionStrategy from "../../InterfaceAdapters/Shared/IEncryptionStrategy";
import jwt from "jwt-simple";
import Config from "config";
import EncryptionFactory from "../../Infrastructure/Factories/EncryptionFactory";
import IAuthService from "../../InterfaceAdapters/IServices/IAuthService";

@injectable()
class AuthService implements IAuthService
{
    private encryption: IEncryptionStrategy;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
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
}

export default AuthService;