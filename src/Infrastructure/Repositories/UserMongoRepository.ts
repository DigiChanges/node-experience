import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import {injectable} from "inversify";
import ErrorException from "../../Application/Shared/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import MongoPaginator from "../../Presentation/Shared/MongoPaginator";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import UserFilter from "../../Presentation/Criterias/User/UserFilter";
import IUser from "../../InterfaceAdapters/IEntities/Mongoose/IUserDocument";
import UserSchema from "../Schema/User";
import {Model} from "mongoose";
import {ObjectID} from "typeorm";
import {connection} from "../Database/MongooseCreateConnection";

@injectable()
class UserMongoRepository implements IUserRepository
{
    private repository: Model<IUser>;

    constructor()
    {
        this.repository = connection.model<IUser>('User', UserSchema);
    }

    async save (user: IUser): Promise<IUser>
    {
        return await this.repository.create(user);
    }

    async getOne(id: ObjectID): Promise<IUser>
    {
        const user = await this.repository.findOne(id);

        if (!user) {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found')
        }

        return user;
    }

    async getOneByEmail(email: string): Promise<IUser>
    {
        try
        {
            const user = await this.repository.findOne({"email": email});

            if (!user)
            {
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
            }

            return user;
        } catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
        }

    }

    async getOneByConfirmationToken(confirmationToken: string): Promise<IUser>
    {
        try
        {
            const user = await this.repository.findOne({"confirmationToken": confirmationToken});

            if (!user)
            {
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

        // @ts-ignore
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

        // @ts-ignore
        return new MongoPaginator(aggregationCursor, criteria, count);
    }

    async update(user: IUser): Promise<IUser>
    {
        // @ts-ignore
        return await this.repository.save(user);
    }

    async delete(id: string): Promise<any>
    {
        // @ts-ignore
        return await this.repository.delete(id);
    }
}

export default UserMongoRepository;