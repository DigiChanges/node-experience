import moment from 'moment';
import jwt from 'jwt-simple';
import IToken from '../InterfaceAdapters/IToken';
import Config from 'config';
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
        this.user = user;
        this.expires = moment().utc().add({ minutes: expires }).unix();
        this.payload = {
            id,
            iss: Config.get('jwt.iss'),
            aud: Config.get('jwt.aud'),
            sub: user.email,
            iat: this.expires,
            exp: this.expires,
            user_id: user.get_id(),
            email: user.email
        };
        this.hash = jwt.encode(this.payload, secret, 'HS512');
    }

    get_expires(): number
    {
        return this.expires;
    }

    get_hash(): string
    {
        return this.hash;
    }

    get_payload(): any
    {
        return this.payload;
    }

    get_user(): IUserDomain
    {
        return this.user;
    }
}

export default JWTToken;
