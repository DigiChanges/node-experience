import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import IRoleTransformer from '../../InterfaceAdapters/IRoleTransformer';

class RoleTransformer extends Transformer
{
    public transform(role: IRoleDomain): IRoleTransformer
    {
        return {
            id: role.getId(),
            name: role.name,
            slug: role.slug,
            permissions: role.permissions ? role.permissions : null,
            enable: role.enable,
            createdAt: moment(role.createdAt).utc().unix(),
            updatedAt: moment(role.updatedAt).utc().unix()
        };
    }
}

export default RoleTransformer;
