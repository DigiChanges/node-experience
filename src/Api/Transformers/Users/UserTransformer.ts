import Transformer from "../../../Lib/Transformer";
import User from "../../../Entities/User";
// @ts-ignore
import moment from "moment";

class UserTransformer extends Transformer
{
    public transform(user: User)
    {
        return {
            'id': user._id,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email,
            'enable': user.enable,
            'roles': user.roles,
            'permissions': user.permissions,
            'createdAt': moment(user.createdAt).format('DD-MM-YYYY HH:SS'),
            'updatedAt': moment(user.updatedAt).format('DD-MM-YYYY HH:SS')
        };
    }
}

export default UserTransformer;