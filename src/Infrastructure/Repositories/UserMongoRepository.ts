import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import {DeleteResult, getMongoRepository, MongoRepository} from "typeorm";
import User from "../Entities/User";
import {injectable} from "inversify";
import ErrorException from "../../Lib/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import MongoPaginator from "../../Presentation/Shared/MongoPaginator";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import UserFilter from "../../Presentation/Criterias/User/UserFilter";

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
        try {
            const user = await this.repository.findOne({"email": email});

            if (!user) {
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
            }

            return user;
        } catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
        }

    }

    async getOneByConfirmationToken(confirmationToken: string): Promise<User> {
        try {
            const user = await this.repository.findOne({"confirmationToken": confirmationToken});

            if (!user) {
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
            }

            return user;
        } catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
        }

    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let aggregateData = [];
        aggregateData.push({
                $project: {
                    "id": "$_id"
                },
                $lookup: {
                    from: "role",
                    localField: "roles",
                    foreignField: "_id",
                    as: "roles"
                }
            }
        );

        const count = await this.repository.count();
        let aggregationCursor = this.repository.aggregate(aggregateData);
        const filter = criteria.getFilter();
        let filters = {};

        if (filter.has(UserFilter.ENABLE))
        {
            let _enable = filter.get(UserFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            Object.assign(filters, {enable: { $eq : enable }});
        }
        if (filter.has(UserFilter.EMAIL)) {
            let email = filter.get(UserFilter.EMAIL);

            Object.assign(filters, {email: { $regex: email }});
        }
        if (filter.has(UserFilter.IS_SUPER_ADMIN)) {
            let isSuperAdmin = filter.get(UserFilter.IS_SUPER_ADMIN);
            Object.assign(filters, {isSuperAdmin: {$eq : isSuperAdmin}});
        }

        if (Object.entries(filters))
        {
            aggregationCursor.match(filters);
        }

        return new MongoPaginator(aggregationCursor, criteria, count);
    }

    async update(user: User): Promise<any> {
        await this.repository.save(user);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
}

export default UserMongoRepository;