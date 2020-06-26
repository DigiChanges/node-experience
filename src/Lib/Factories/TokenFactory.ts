import Config from "config";
import User from "../../Infrastructure/Entities/User";
import JWTToken from "../Auth/JWTToken";
import IToken from "../Auth/IToken";

// TODO: Change logic with payload to extend and add new payload
class TokenFactory
{
    public token(user: User): IToken
    {
        const expires: number = Config.get('jwt.expires');
        const secret: string = Config.get('jwt.secret');

        return new JWTToken(expires, user, secret);
    };
}

export default TokenFactory;