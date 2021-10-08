import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import IRoleTransformer from '../../InterfaceAdapters/IRoleTransformer';

class RoleTransformer extends Transformer
{
    public transform(role: IRoleDomain): IRoleTransformer
    {
        return {
            id: role.get_id(),
            name: role.name,
            slug: role.slug,
            permissions: role.permissions ? role.permissions : null,
            enable: role.enable,
            createdAt: moment(role.created_at).utc().unix(),
            updatedAt: moment(role.updated_at).utc().unix()
        };
    }
}

export default RoleTransformer;
