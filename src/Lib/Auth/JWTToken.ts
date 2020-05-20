import moment from "moment";
import jwt from "jwt-simple";
import User from "../../Entities/User";
import IToken from "./IToken";
import Config from "config";

// TODO: Refactoring to remove User entity
class JWTToken implements IToken
{
    private readonly expires: number;
    private readonly hash: string;
    private readonly user: User;

    constructor(expires: number, user: User, secret: string)
    {
        this.user = user;
        this.expires = moment().utc().add({ minutes: expires }).unix();
        this.hash = jwt.encode({
            iss: Config.get('jwt.iss'),
            aud: Config.get('jwt.aud'),
            sub: user.email,
            iat: this.expires,
            exp: this.expires,
            userId: user._id,
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

    getUser(): User
    {
        return this.user;
    }
}

export default JWTToken