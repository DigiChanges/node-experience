import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import IRoleTransformer from './IRoleTransformer';

class RoleTransformer extends Transformer
{
    public async transform(role: IRoleDomain): Promise<IRoleTransformer>
    {
        return {
            id: role.getId(),
            name: role.name,
            permissions: role.permissions ? role.permissions : null
        };
    }
}

export default RoleTransformer;
