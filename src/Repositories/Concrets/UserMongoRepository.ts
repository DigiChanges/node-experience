import IUserRepository from "../Contracts/IUserRepository";
import {DeleteResult, getMongoRepository, MongoRepository} from "typeorm";
import User from "../../Entities/User";
import {injectable} from "inversify";
import ErrorException from "../../Lib/ErrorException";
import StatusCode from "../../Lib/StatusCode";
import MongoPaginator from "../../Lib/MongoPaginator";
import IPaginator from "../../Lib/Contracts/IPaginator";
import ICriteria from "../../Lib/Contracts/ICriteria";
import UserFilter from "../../Api/Libs/Criterias/User/UserFilter";

@injectable()
class UserMongoRepository implements IUserRepository {
    private repository: MongoRepository<User>;

    constructor() {
        this.repository = getMongoRepository(User);
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

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const count = await this.repository.count();
        const cursor = await this.repository.createCursor();
        const filter = criteria.getFilter();
        console.log("cantidad total de doc ", count);
        // queryBuilder.where("1 = 1");

        // if (filter.has(UserFilter.ENABLE))
        // {
        //     const enable = filter.get(UserFilter.ENABLE);
        //     cursor.filter({[UserFilter.ENABLE]: [enable]});
        // }
        // if (filter.has(UserFilter.EMAIL))
        // {
        //     queryBuilder.andWhere("i." + UserFilter.EMAIL + " like :" + UserFilter.EMAIL);
        //     queryBuilder.setParameter(UserFilter.EMAIL, '%' + filter.get(UserFilter.EMAIL) + '%');
        // }
        //
        const paginator = new MongoPaginator(cursor, criteria, count);
        //
        return await paginator;
    }

    async update(user: User): Promise<any> {
        this.repository.save(user);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

}

export default UserMongoRepository;