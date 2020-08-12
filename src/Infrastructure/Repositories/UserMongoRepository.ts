import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import {injectable} from "inversify";
import ErrorException from "../../Application/Shared/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import MongoPaginator from "../../Presentation/Shared/MongoPaginator";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import UserFilter from "../../Presentation/Criterias/User/UserFilter";
import IUser from "../../InterfaceAdapters/IEntities/Mongoose/IUserDocument";
import {DocumentQuery, Model} from "mongoose";
import {ObjectID} from "mongodb";
import {connection} from "../Database/MongooseCreateConnection";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";

@injectable()
class UserMongoRepository implements IUserRepository
{
    private repository: Model<IUser>;

    constructor()
    {
        this.repository = connection.model<IUser>('User');
    }

    async save (user: IUserDomain): Promise<IUserDomain>
    {
        return await this.repository.create(user);
    }

    async getOne(id: ObjectID): Promise<IUserDomain>
    {
        try
        {
            let user = await this.repository.findOne({_id: id}).populate('roles');

            if (!user)
            {
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
            }

            return user;
        }
        catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
        }
    }

    async getOneByEmail(email: string): Promise<any>
    {
        try
        {
            const user = await this.repository.findOne({'email': email}).populate('roles');

            if (!user)
            {
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Role Not Found');
            }

            return user;
        } catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
        }

    }

    async getOneByConfirmationToken(confirmationToken: string): Promise<IUserDomain>
    {
        try
        {
            const user = await this.repository.findOne({"confirmationToken": confirmationToken}).populate('roles');

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
        const queryBuilder: DocumentQuery<IUser[], IUser> = this.repository.find({});
        const filter = criteria.getFilter();

        if (filter.has(UserFilter.ENABLE))
        {
            let _enable = filter.get(UserFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            queryBuilder.where(UserFilter.ENABLE).equals(enable);
        }
        if (filter.has(UserFilter.EMAIL))
        {
            let email = filter.get(UserFilter.EMAIL);
            const rsearch = new RegExp(email, "g");

            queryBuilder.where(UserFilter.EMAIL).regex(rsearch);
        }
        if (filter.has(UserFilter.IS_SUPER_ADMIN))
        {
            let isSuperAdmin: boolean = filter.get(UserFilter.IS_SUPER_ADMIN);
            
            queryBuilder.where(UserFilter.IS_SUPER_ADMIN).equals(isSuperAdmin);
        }

        queryBuilder.populate('roles');

        return new MongoPaginator(queryBuilder, criteria);
    }

    async update(user: IUserDomain): Promise<IUserDomain>
    {
        return this.repository.findByIdAndUpdate({_id: user.getId()}, user).populate('roles');
    }

    async delete(id: string): Promise<IUserDomain>
    {
        try
        {
            const user = await this.repository.findByIdAndDelete(id).populate('roles');

            if (!user)
            {
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
            }

            return user;
        }
        catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'User Not Found');
        }
    }
}

export default UserMongoRepository;