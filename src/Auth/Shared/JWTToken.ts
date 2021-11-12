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
    private readonly user: IUserDomain;
    private readonly payload: ITokenDecode;

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
        this.hash = jwt.encode(this.payload, secret, 'HS512');
    }

    getExpires(): number
    {
        return this.expires;
    }

    getHash(): string
    {
        return this.hash;
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
