import Transformer from "../../../Lib/Transformer";
import moment from "moment";
import IToken from "../../../Lib/Auth/IToken";

class AuthTransformer extends Transformer
{
    public transform(token: IToken)
    {
        return {
            'user': {
                'id': token.getUser().getId(),
                'email': token.getUser().getEmail(),
                'enable': token.getUser().isEnable(),
                'createdAt': moment(token.getUser().getCreatedAt()).format('DD-MM-YYYY HH:SS'),
                'updatedAt': moment(token.getUser().getUpdatedAt()).format('DD-MM-YYYY HH:SS'),
            },
            'expires': token.getExpires(),
            'token': token.getHash()
        };
    }
}

export default AuthTransformer;