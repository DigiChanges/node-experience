import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import IRoleTransformer from './IRoleTransformer';

class RoleUserTransformer extends Transformer
{
    public async transform(role: IRoleDomain): Promise<IRoleTransformer>
    {
        dayjs.extend(utc);

        return {
            id: role.getId(),
            name: role.name,
            slug: role.slug,
            enable: role.enable,
            createdAt: dayjs(role.createdAt).utc().unix(),
            updatedAt: dayjs(role.updatedAt).utc().unix()
        };
    }
}

export default RoleUserTransformer;
