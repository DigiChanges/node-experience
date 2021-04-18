import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import {getRepository, Repository} from 'typeorm';
import User from '../../Domain/Entities/User';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import Paginator from '../../../App/Presentation/Shared/Paginator';
import UserFilter from '../../Presentation/Criterias/UserFilter';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserSchema from '../Schema/UserTypeORM';

import NotFoundException from '../../../App/Infrastructure/Exceptions/NotFoundException';

@injectable()
class UserSqlRepository implements IUserRepository
{
    private repository: Repository<User>;

    constructor()
    {
        this.repository = getRepository<User>(UserSchema);
    }

    async save(user: IUserDomain): Promise<IUserDomain>
    {
        return await this.repository.save(user);
    }

    async getOne(id: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne(id);

        if (!user)
        {
            throw new NotFoundException('User');
        }

        return user;
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({'email': email});

        if (!user)
        {
            throw new NotFoundException('User');
        }

        return user;
    }

    async getOneByConfirmationToken(confirmationToken: string): Promise<User>
    {
        const user = await this.repository.findOne({'confirmationToken': confirmationToken});

        if (!user)
        {
            throw new NotFoundException('User');
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
            queryBuilder.andWhere(`i.${UserFilter.ENABLE} = :${UserFilter.ENABLE}`);
            queryBuilder.setParameter(UserFilter.ENABLE, filter.get(UserFilter.ENABLE));
        }
        if (filter.has(UserFilter.EMAIL))
        {
            queryBuilder.andWhere(`i.${UserFilter.EMAIL} like :${UserFilter.EMAIL}`);
            queryBuilder.setParameter(UserFilter.EMAIL, `%${filter.get(UserFilter.EMAIL)}%`);
        }

        queryBuilder.leftJoinAndSelect('i.roles', 'role');

        return new Paginator(queryBuilder, criteria);
    }

    async update(user: IUserDomain): Promise<any>
    {
        await this.repository.save(user);
    }

    async delete(id: string): Promise<any>
    {
        return await this.repository.delete(id);
    }

}

export default UserSqlRepository;
