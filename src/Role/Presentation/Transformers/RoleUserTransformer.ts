import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import IRoleTransformer from './IRoleTransformer';

class RoleUserTransformer extends Transformer
{
    public async transform(role: IRoleDomain): Promise<IRoleTransformer>
    {
        return {
            id: role.getId(),
            name: role.name,
            slug: role.slug,
            enable: role.enable,
            createdAt: moment(role.createdAt).utc().unix(),
            updatedAt: moment(role.updatedAt).utc().unix()
        };
    }
}

export default RoleUserTransformer;
