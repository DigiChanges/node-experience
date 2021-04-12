import IUserRepository from '../../InterfaceAdapters/IRepositories/IUserRepository';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import MongoPaginator from '../../Presentation/Shared/MongoPaginator';
import UserFilter from '../../Presentation/Criterias/User/UserFilter';
import IUser from '../../InterfaceAdapters/IEntities/Mongoose/IUserDocument';
import {Query, Model} from 'mongoose';
import {connection} from '../Database/MongooseCreateConnection';
import IUserDomain from '../../InterfaceAdapters/IDomain/IUserDomain';

import NotFoundException from '../Exceptions/NotFoundException';

@injectable()
class UserMongoRepository implements IUserRepository
{
    private repository: Model<IUser>;

    constructor()
    {
        this.repository = connection.model<IUser>('User');
    }

    async save(user: IUserDomain): Promise<IUserDomain>
    {
        return await this.repository.create(user);
    }

    async getOne(id: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({_id: id}).populate('roles');

        if (!user)
        {
            throw new NotFoundException('User');
        }

        return user;
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({'email': email}).populate('roles');

        if (!user)
        {
            throw new NotFoundException('User');
        }

        return user;
    }

    async getOneByConfirmationToken(confirmationToken: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({'confirmationToken': confirmationToken}).populate('roles');

        if (!user)
        {
            throw new NotFoundException('User');
        }

        return user;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IUser[], IUser> = this.repository.find({});
        const filter = criteria.getFilter();

        if (filter.has(UserFilter.ENABLE))
        {
            const _enable = filter.get(UserFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            void queryBuilder.where(UserFilter.ENABLE).equals(enable);
        }
        if (filter.has(UserFilter.EMAIL))
        {
            const email = filter.get(UserFilter.EMAIL);
            const rsearch = new RegExp(email, 'g');

            void queryBuilder.where(UserFilter.EMAIL).regex(rsearch);
        }
        if (filter.has(UserFilter.IS_SUPER_ADMIN))
        {
            const isSuperAdmin: boolean = filter.get(UserFilter.IS_SUPER_ADMIN);

            void queryBuilder.where(UserFilter.IS_SUPER_ADMIN).equals(isSuperAdmin);
        }

        void queryBuilder.populate('roles');

        return new MongoPaginator(queryBuilder, criteria);
    }

    async update(user: IUserDomain): Promise<IUserDomain>
    {
        return this.repository.findByIdAndUpdate({_id: user.getId()}, user).populate('roles');
    }

    async delete(id: string): Promise<IUserDomain>
    {
        const user = await this.repository.findByIdAndDelete(id).populate('roles');

        if (!user)
        {
            throw new NotFoundException('User');
        }

        return user;
    }
}

export default UserMongoRepository;
