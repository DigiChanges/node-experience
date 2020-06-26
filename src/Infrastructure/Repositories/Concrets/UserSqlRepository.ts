import IUserRepository from "../Contracts/IUserRepository";
import {DeleteResult, getRepository, Repository} from "typeorm";
import User from "../../Entities/User";
import {injectable} from "inversify";
import ErrorException from "../../../Lib/ErrorException";
import StatusCode from "../../../Lib/StatusCode";
import Paginator from "../../../Lib/Paginator";
import IPaginator from "../../../Lib/Contracts/IPaginator";
import ICriteria from "../../../Lib/Contracts/ICriteria";
import UserFilter from "../../../Application/Api/Libs/Criterias/User/UserFilter";

@injectable()
class UserSqlRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async save (user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async findOne(id: string): Promise<User> {
        const user = await this.repository.findOne(id);

        if (!user) {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found')
        }

        return user;
    }

    async getOneByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({"email": email});

        if (!user) {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found')
        }

        return user;
    }

    async getOneByConfirmationToken(confirmationToken: string): Promise<User> {
        const user = await this.repository.findOne({"confirmationToken": confirmationToken});

        if (!user) {
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

        const paginator = new Paginator(queryBuilder, criteria);

        return await paginator;
    }

    async update(user: User): Promise<any> {
        this.repository.save(user);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

}

export default UserSqlRepository;