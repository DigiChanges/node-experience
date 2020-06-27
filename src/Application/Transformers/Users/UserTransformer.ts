// @ts-ignore
import moment from "moment";
import Transformer from "../../../Lib/Transformer";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";

class UserTransformer extends Transformer
{
    public transform(user: IUser)
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