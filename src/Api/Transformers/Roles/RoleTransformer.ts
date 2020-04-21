import Transformer from "../../../Lib/Transformer";
import Role from "../../../Entities/Role";
import moment from "moment";

class RoleTransformer extends Transformer
{
    public transform(role: Role)
    {
        console.log(role);
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