import moment from "moment";
import Transformer from "../../Shared/Transformer";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import RoleTransformer from "../Roles/RoleTransformer";

class UserTransformer extends Transformer
{
    private roleTransformer: RoleTransformer;

    constructor()
    {
        super();
        this.roleTransformer = new RoleTransformer();
    }

    public transform(user: IUserDomain)
    {
        return {
            'id': user.getId(),
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email,
            'enable': user.enable,
            'roles': this.roleTransformer.handle(user.getRoles()),
            // 'permissions': user.permissions,
            'createdAt': moment(user.createdAt).utc().unix(),
            'updatedAt': moment(user.updatedAt).utc().unix(),
        };
    }
}

export default UserTransformer;
