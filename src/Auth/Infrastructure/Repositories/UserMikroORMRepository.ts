import UserFilter from '../../Presentation/Criterias/UserFilter';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import User from '../../Domain/Entities/User';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import IUserRepository from './IUserRepository';
import BaseMikroORMRepository from '../../../Shared/Infrastructure/Repositories/BaseMikroORMRepository';
import UserSchema from '../Schemas/UserMikroORM';
import { QueryBuilder } from '@mikro-orm/postgresql';
import MikroORMPaginator from '../../../Shared/Infrastructure/Orm/MikroORMPaginator';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

class UserMikroORMRepository extends BaseMikroORMRepository<IUserDomain> implements IUserRepository
{
    constructor()
    {
        super('User', UserSchema, ['roles']);
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({ email }, { populate: true });

        if (!user)
        {
            throw new NotFoundException(User.name);
        }

        return user as IUserDomain;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: QueryBuilder = this.em.createQueryBuilder('User', 'i');

        const filter = criteria.getFilter();

        void queryBuilder.where('1 = 1');

        if (filter.has(UserFilter.ENABLE))
        {
            void queryBuilder.andWhere(`i.${UserFilter.ENABLE} = ?`, [`${filter.get(UserFilter.ENABLE)}`]);
        }
        if (filter.has(UserFilter.EMAIL))
        {
            void queryBuilder.andWhere(`i.${UserFilter.EMAIL} like ?`, [`%${filter.get(UserFilter.EMAIL)}%`]);
        }

        void await queryBuilder.joinAndSelect('roles', 'r');

        return new MikroORMPaginator(queryBuilder, criteria);
    }
}

export default UserMikroORMRepository;
