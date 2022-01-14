import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import User from '../../Domain/Entities/User';
import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import Paginator from '../../../App/Presentation/Shared/Paginator';
import UserFilter from '../../Presentation/Criterias/UserFilter';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserSchema from '../Schemas/UserTypeORM';

import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import BaseSqlRepository from '../../../App/Infrastructure/Repositories/BaseSqlRepository';

@injectable()
class UserSqlRepository extends BaseSqlRepository<IUserDomain> implements IUserRepository
{
    constructor()
    {
        super(User.name, UserSchema);
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({ email });

        if (!user)
        {
            throw new NotFoundException(User.name);
        }

        return user;
    }

    async getOneByConfirmationToken(confirmationToken: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({ confirmationToken });

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
            // FIXME: column enable is ambiguous error occurs
            // const _enable = filter.get(UserFilter.ENABLE);
            // const enable: boolean = _enable !== 'false';

            // queryBuilder.andWhere(`"${UserFilter.ENABLE}" = :${UserFilter.ENABLE}`);
            // queryBuilder.setParameter(UserFilter.ENABLE, enable);
        }

        if (filter.has(UserFilter.EMAIL))
        {
            const email = filter.get(UserFilter.EMAIL);

            queryBuilder.andWhere(`"${UserFilter.EMAIL}" ilike :${UserFilter.EMAIL}`);
            queryBuilder.setParameter(UserFilter.EMAIL, `%${email}%`);
        }

        if (filter.has(UserFilter.IS_SUPER_ADMIN))
        {
            const isSuperAdmin = filter.get(UserFilter.IS_SUPER_ADMIN);

            queryBuilder.andWhere(`"${UserFilter.IS_SUPER_ADMIN}" = :${UserFilter.IS_SUPER_ADMIN}`);
            queryBuilder.setParameter(UserFilter.IS_SUPER_ADMIN, isSuperAdmin);
        }

        queryBuilder.leftJoinAndSelect('i.roles', 'role');

        return new Paginator(queryBuilder, criteria);
    }
}

export default UserSqlRepository;
