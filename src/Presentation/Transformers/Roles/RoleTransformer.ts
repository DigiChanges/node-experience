import moment from "moment";
import Transformer from "../../Shared/Transformer";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";

class RoleTransformer extends Transformer
{
    public transform(role: IRoleDomain)
    {
        return {
            'id': role.getId(),
            'name': role.name,
            'slug': role.slug,
            // 'permissions': role.permissions ? role.permissions : null,
            'enable': role.enable,
            'createdAt': moment(role.createdAt).utc().unix(),
            'updatedAt': moment(role.updatedAt).utc().unix(),
        };
    }
}

export default RoleTransformer;
