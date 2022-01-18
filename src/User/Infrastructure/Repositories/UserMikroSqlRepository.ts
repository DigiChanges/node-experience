import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import UserFilter from '../../Presentation/Criterias/UserFilter';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import User from '../../Domain/Entities/User';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import BaseMikroSqlRepository from '../../../App/Infrastructure/Repositories/BaseMikroSqlRepository';
import UserSchema from '../Schemas/UserMikroORM';
import { QueryBuilder } from '@mikro-orm/postgresql';
import MikroPaginator from '../../../App/Presentation/Shared/MikroPaginator';

@injectable()
class UserMikroSqlRepository extends BaseMikroSqlRepository<IUserDomain> implements IUserRepository
{
    constructor()
    {
        super('User', UserSchema);
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

    async getOneByConfirmationToken(confirmationToken: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({ confirmationToken }, { populate: true });

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

        return new MikroPaginator(queryBuilder, criteria);
    }
}

export default UserMikroSqlRepository;
