import IUserDomain from '../Domain/Entities/IUserDomain';
import ICriteria from '../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../Shared/Infrastructure/Orm/IPaginator';
import UserAssignRolePayload from '../Domain/Payloads/User/UserAssignRolePayload';
import { payloadUser, responseIPaginator } from './DataMock';
import User from '../Domain/Entities/User';
import IUserRepository from '../Infrastructure/Repositories/User/IUserRepository';

class UserMockRepository implements IUserRepository
{
    async save(element: IUserDomain, password: string): Promise<IUserDomain>
    {
        const user = new User(payloadUser);
        return new Promise<IUserDomain>((resolve) => resolve(user));
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        const user = new User(payloadUser);
        return new Promise<IUserDomain>((resolve) => resolve(user));
    }

    async updatePassword(id: string, password: string): Promise<unknown>
    {
        return new Promise<unknown>((resolve) => resolve({}));
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        return new Promise<IPaginator>((resolve) => resolve(responseIPaginator));
    }

    async active(element: IUserDomain): Promise<unknown>
    {
        return new Promise<unknown>((resolve) => resolve({}));
    }

    async assignRoles(payload: UserAssignRolePayload): Promise<void>
    {
        return new Promise<void>((resolve) => resolve());
    }

    delete(id: string): Promise<IUserDomain>
    {
        return Promise.resolve(undefined);
    }

    getOne(id: string): Promise<IUserDomain>
    {
        return Promise.resolve(undefined);
    }

    update(element: IUserDomain): Promise<IUserDomain>
    {
        return Promise.resolve(undefined);
    }
}

export default UserMockRepository;
