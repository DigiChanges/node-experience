import Config from "config";
import JWTToken from "../../Application/Shared/JWTToken";
import IToken from "../../InterfaceAdapters/Shared/IToken";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";

// TODO: Change logic with payload to extend and add new payload
class TokenFactory
{
    public token(user: IUserDomain): IToken
    {
        const expires: number = Config.get('jwt.expires');
        const secret: string = Config.get('jwt.secret');

        return new JWTToken(expires, user, secret);
    };
}

export default TokenFactory;
