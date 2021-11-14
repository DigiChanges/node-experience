import moment from 'moment';
import jwt from 'jwt-simple';
import IToken from '../InterfaceAdapters/IToken';
import MainConfig from '../../Config/mainConfig';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import ITokenDecode from '../../Shared/InterfaceAdapters/ITokenDecode';

class JWTToken implements IToken
{
    private readonly expires: number;
    private readonly hash: string;
    private readonly refreshHash: string;
    private readonly user: IUserDomain;
    private readonly payload: ITokenDecode;
    private readonly payloadRefreshToken: ITokenDecode;

    constructor(id: string, expires: number, user: IUserDomain, secret: string)
    {
        const config = MainConfig.getInstance();
        this.user = user;
        this.expires = moment().utc().add({ minutes: expires }).unix();
        this.payload = {
            id,
            iss: config.getConfig().jwt.iss,
            aud: config.getConfig().jwt.aud,
            sub: user.email,
            iat: this.expires,
            exp: this.expires,
            userId: user.getId(),
            email: user.email
        };

        const expiresRefreshToken = moment().utc().add({ minutes: expires + 1 }).unix();

        this.payloadRefreshToken = {
            ...this.payload,
            iat: expiresRefreshToken,
            exp: expiresRefreshToken
        };

        this.hash = jwt.encode(this.payload, secret, 'HS512');
        this.refreshHash = jwt.encode(this.payloadRefreshToken, secret, 'HS512');
    }

    getExpires(): number
    {
        return this.expires;
    }

    getHash(): string
    {
        return this.hash;
    }

    getRefreshHash(): string
    {
        return this.refreshHash;
    }

    getPayload(): any
    {
        return this.payload;
    }

    getUser(): IUserDomain
    {
        return this.user;
    }
}

export default JWTToken;
