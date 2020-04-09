import config from "../../../config/config";
import User from "../../Entities/User";
import JWTToken from "../Auth/JWTToken";
import IToken from "../Auth/IToken";

// TODO: Change logic with payload to extend and add new payload
class TokenFactory
{
    public token(user: User): IToken
    {
        const expires = Number(config.jwt.expires);
        const secret = String(config.jwt.secret);
        console.log(secret);
        return new JWTToken(expires, user, secret);
    };
}

export default TokenFactory;