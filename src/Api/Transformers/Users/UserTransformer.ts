import Transformer from "../../../Lib/Transformer";
import User from "../../../Entities/User";
import moment from "moment";

class UserTransformer extends Transformer
{
    public transform(user: User)
    {
        return {
            'id': user._id,
            'email': user.email,
            'enable': user.enable,
            'roles': user.roles,
            'permissions': user.permissions,
            'confirmationToken': user.confirmationToken,
            'passwordRequestedAt': user.passwordRequestedAt,
            'createdAt': moment(user.createdAt).format('DD-MM-YYYY HH:SS'),
            'updatedAt': moment(user.updatedAt).format('DD-MM-YYYY HH:SS')
        };
    }
}

export default UserTransformer;