import { Query } from 'mongoose';
import IUserRepository from './IUserRepository';

import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import UserFilter from '../../Presentation/Criterias/UserFilter';
import IUserDomain from '../../Domain/Entities/IUserDomain';

import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import User from '../../Domain/Entities/User';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import { UserMongooseDocument } from '../Schemas/UserMongoose';

class UserMongooseRepository extends BaseMongooseRepository<IUserDomain, UserMongooseDocument> implements IUserRepository
{
    constructor()
    {
        super(User.name, ['roles']);
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({ email }).populate(this.populate);

        if (!user)
        {
            throw new NotFoundException('User');
        }

        return user;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<UserMongooseDocument[], UserMongooseDocument> = this.repository.find({});
        const filter = criteria.getFilter();

        if (filter.has(UserFilter.ENABLE))
        {
            const _enable = filter.get(UserFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            void queryBuilder.where(UserFilter.ENABLE).equals(enable);
        }

        if (filter.has(UserFilter.EMAIL))
        {
            const email = filter.get(UserFilter.EMAIL) as string;
            const rSearch = new RegExp(email, 'g');

            void queryBuilder.where(UserFilter.EMAIL).regex(rSearch);
        }

        if (filter.has(UserFilter.IS_SUPER_ADMIN))
        {
            const isSuperAdmin = filter.get(UserFilter.IS_SUPER_ADMIN) as boolean;

            void queryBuilder.where(UserFilter.IS_SUPER_ADMIN).equals(isSuperAdmin);
        }

        void queryBuilder.populate('roles');

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default UserMongooseRepository;
