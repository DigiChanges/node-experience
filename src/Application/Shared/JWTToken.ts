import moment from "moment";
import jwt from "jwt-simple";
import IToken from "../../InterfaceAdapters/Shared/IToken";
import Config from "config";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";

class JWTToken implements IToken
{
    private readonly expires: number;
    private readonly hash: string;
    private readonly user: IUserDomain;

    constructor(expires: number, user: IUserDomain, secret: string)
    {
        this.user = user;
        this.expires = moment().utc().add({ minutes: expires }).unix();
        this.hash = jwt.encode({
            iss: Config.get('jwt.iss'),
            aud: Config.get('jwt.aud'),
            sub: user.email,
            iat: this.expires,
            exp: this.expires,
            userId: user.getId(),
            email: user.email
        }, secret, 'HS512');
    }

    getExpires(): number
    {
        return this.expires;
    }

    getHash(): string
    {
        return this.hash;
    }

    getUser(): IUserDomain
    {
        return this.user;
    }
}

export default JWTToken;
