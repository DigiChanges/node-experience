import moment from "moment";
import Transformer from "../../Shared/Transformer";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";

class RoleUserTransformer extends Transformer
{
    public transform(role: IRoleDomain)
    {
        return {
            'id': role.getId(),
            'name': role.name,
            'slug': role.slug,
            'enable': role.enable,
            'createdAt': moment(role.createdAt).utc().unix(),
            'updatedAt': moment(role.updatedAt).utc().unix(),
        };
    }
}

export default RoleUserTransformer;
