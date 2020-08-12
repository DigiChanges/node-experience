import moment from "moment";
import Transformer from "../../Shared/Transformer";
import IToken from "../../../InterfaceAdapters/Shared/IToken";
import RoleTransformer from "../Roles/RoleTransformer";

class AuthTransformer extends Transformer
{
    private roleTransformer: RoleTransformer;

    constructor()
    {
        super();
        this.roleTransformer = new RoleTransformer();
    }

    public transform(token: IToken)
    {
        return {
            'user': {
                'id': token.getUser().getId(),
                'firstName': token.getUser().firstName,
                'lastName': token.getUser().lastName,
                'email': token.getUser().email,
                'enable': token.getUser().enable,
                'roles': this.roleTransformer.handle(token.getUser().roles),
                'createdAt': moment(token.getUser().createdAt).utc().unix(),
                'updatedAt': moment(token.getUser().updatedAt).utc().unix(),
            },
            'expires': token.getExpires(),
            'token': token.getHash()
        };
    }
}

export default AuthTransformer;