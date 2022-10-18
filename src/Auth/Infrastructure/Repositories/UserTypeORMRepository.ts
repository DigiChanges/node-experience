import IUserRepository from './IUserRepository';
import User from '../../Domain/Entities/User';

import TypeORMPaginator from '../../../Shared/Infrastructure/Orm/TypeORMPaginator';
import UserFilter from '../../Presentation/Criterias/UserFilter';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import UserSchema from '../Schemas/UserTypeORM';

import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import BaseTypeORMRepository from '../../../Shared/Infrastructure/Repositories/BaseTypeORMRepository';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';

class UserTypeORMRepository extends BaseTypeORMRepository<IUserDomain> implements IUserRepository
{
    constructor()
    {
        super(User.name, UserSchema);
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOneBy({ email });

        if (!user)
        {
            throw new NotFoundException(User.name);
        }

        return user;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = criteria.getFilter();

        queryBuilder.where('1 = 1');

        if (filter.has(UserFilter.ENABLE))
        {
            const _enable = filter.get(UserFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            queryBuilder.andWhere(`i.${UserFilter.ENABLE} = :${UserFilter.ENABLE}`);
            queryBuilder.setParameter(UserFilter.ENABLE, enable);
        }

        if (filter.has(UserFilter.EMAIL))
        {
            const email = filter.get(UserFilter.EMAIL);

            queryBuilder.andWhere(`i.${UserFilter.EMAIL} ilike :${UserFilter.EMAIL}`);
            queryBuilder.setParameter(UserFilter.EMAIL, `%${email}%`);
        }

        if (filter.has(UserFilter.IS_SUPER_ADMIN))
        {
            const isSuperAdmin = filter.get(UserFilter.IS_SUPER_ADMIN);

            queryBuilder.andWhere(`i.${UserFilter.IS_SUPER_ADMIN} = :${UserFilter.IS_SUPER_ADMIN}`);
            queryBuilder.setParameter(UserFilter.IS_SUPER_ADMIN, isSuperAdmin);
        }

        queryBuilder.leftJoinAndSelect('i.roles', 'role');

        return new TypeORMPaginator(queryBuilder, criteria);
    }
}

export default UserTypeORMRepository;
