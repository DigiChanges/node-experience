import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import IRoleTransformer from '../../InterfaceAdapters/IRoleTransformer';

class RoleUserTransformer extends Transformer
{
    public transform(role: IRoleDomain): IRoleTransformer
    {
        return {
            id: role.get_id(),
            name: role.name,
            slug: role.slug,
            enable: role.enable,
            createdAt: moment(role.created_at).utc().unix(),
            updatedAt: moment(role.updated_at).utc().unix()
        };
    }
}

export default RoleUserTransformer;
