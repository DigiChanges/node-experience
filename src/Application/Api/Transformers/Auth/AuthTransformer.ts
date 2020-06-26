// @ts-ignore
import moment from "moment";
import Transformer from "../../../../Lib/Transformer";
import IToken from "../../../../Lib/Auth/IToken";

class AuthTransformer extends Transformer
{
    public transform(token: IToken)
    {
        return {
            'user': {
                'id': token.getUser()._id,
                'firstName': token.getUser().firstName,
                'lastName': token.getUser().lastName,
                'email': token.getUser().email,
                'enable': token.getUser().enable,
                'createdAt': moment(token.getUser().createdAt).format('DD-MM-YYYY HH:SS'),
                'updatedAt': moment(token.getUser().updatedAt).format('DD-MM-YYYY HH:SS'),
            },
            'expires': token.getExpires(),
            'token': token.getHash()
        };
    }
}

export default AuthTransformer;