// @ts-ignore
import moment from "moment";
import Transformer from "../../Shared/Transformer";
import IRole from "../../../InterfaceAdapters/IEntities/IRole";

class RoleTransformer extends Transformer
{
    public transform(role: IRole)
    {
        return {
            'id': role._id,
            'name': role.name,
            'slug': role.slug,
            'permissions': role.permissions ? role.permissions : null,
            'enable': role.enable,
            'createdAt': moment(role.createdAt).format('DD-MM-YYYY HH:SS'),
            'updatedAt': moment(role.updatedAt).format('DD-MM-YYYY HH:SS'),
        };
    }
}

export default RoleTransformer;