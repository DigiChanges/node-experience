import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import {DeleteResult, getRepository, Repository} from "typeorm";
import User from "../Entities/TypeORM/User";
import {injectable} from "inversify";
import ErrorException from "../../Application/Shared/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import Paginator from "../../Presentation/Shared/Paginator";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import UserFilter from "../../Presentation/Criterias/User/UserFilter";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";

@injectable()
class UserSqlRepository implements IUserRepository
{
    private repository: Repository<User>;

    constructor()
    {
        this.repository = getRepository(User);
    }

    async save (user: IUserDomain): Promise<IUserDomain>
    {
        return await this.repository.save(user);
    }

    async getOne(id: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne(id);

        if (!user)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found')
        }

        return user;
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne({"email": email});

        if (!user)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found')
        }

        return user;
    }

    async getOneByConfirmationToken(confirmationToken: string): Promise<User>
    {
        const user = await this.repository.findOne({"confirmationToken": confirmationToken});

        if (!user)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found')
        }

        return user;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = await this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        queryBuilder.where("1 = 1");

        if (filter.has(UserFilter.ENABLE))
        {
            queryBuilder.andWhere("i." + UserFilter.ENABLE + " = :" + UserFilter.ENABLE);
            queryBuilder.setParameter(UserFilter.ENABLE, filter.get(UserFilter.ENABLE));
        }
        if (filter.has(UserFilter.EMAIL))
        {
            queryBuilder.andWhere("i." + UserFilter.EMAIL + " like :" + UserFilter.EMAIL);
            queryBuilder.setParameter(UserFilter.EMAIL, '%' + filter.get(UserFilter.EMAIL) + '%');
        }

        return new Paginator(queryBuilder, criteria);
    }

    async update(user: IUserDomain): Promise<any>
    {
        await this.repository.save(user);
    }

    async delete(id: string): Promise<DeleteResult>
    {
        return await this.repository.delete(id);
    }

}

export default UserSqlRepository;