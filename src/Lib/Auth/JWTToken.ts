import moment from "moment";
import jwt from "jwt-simple";
import User from "../../Entities/User";
import IToken from "./IToken";

// TODO: Refactoring to remove User entity
class JWTToken implements IToken
{
    private expires: number;
    private hash: string;
    private user: User;

    constructor(expires: number, user: User, secret: string)
    {
        this.user = user;
        this.expires = moment().utc().add({ minutes: expires }).unix();
        this.hash = jwt.encode({
            exp: this.expires,
            email: user.email
        }, secret);
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