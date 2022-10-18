import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import RoleTransformer from './RoleTransformer';
import IUserTransformer from './IUserTransformer';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

class UserTransformer extends Transformer
{
    private roleTransformer: RoleTransformer;

    constructor()
    {
        super();
        this.roleTransformer = new RoleTransformer();
    }

    public async transform(user: IUserDomain): Promise<IUserTransformer>
    {
        dayjs.extend(utc);

        return {
            id: user.getId(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            gender: user.gender,
            phone: user.phone,
            country: user.country,
            address: user.address,
            enable: user.enable,
            roles: await this.roleTransformer.handle(user.getRoles()),
            permissions: user.permissions,
            createdAt: dayjs(user.createdAt).utc().unix(),
            updatedAt: dayjs(user.updatedAt).utc().unix()
        };
    }
}

export default UserTransformer;
