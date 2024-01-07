import IAuthRepository from 'Auth/Domain/Repositories/IAuthRepository';
import PermissionPayload from '../Domain/Payload/PermissionPayload';
import IUserDomain from '../Domain/Entities/IUserDomain';
import IPermissionDomain from '../Domain/Entities/IPermissionDomain';
import IRoleDomain from '../Domain/Entities/IRoleDomain';
import IRolePermissionDomain from '../Domain/Entities/IRolePermissionDomain';

class AuthMockRepository implements IAuthRepository
{
    async checkPermissions(payload: PermissionPayload): Promise<boolean>
    {
        return Promise.resolve(true);
    }

    async getAuthUser(data: string): Promise<IUserDomain>
    {
        return Promise.resolve(undefined);
    }

    getPermissions(): Promise<IPermissionDomain[]>
    {
        return Promise.resolve([]);
    }

    addPermissions(permissions: string[]): Promise<void>
    {
        return Promise.resolve();
    }

    removePermissions(permissions: string[]): Promise<void>
    {
        return Promise.resolve();
    }

    getRoles(): Promise<IRoleDomain[]>
    {
        return Promise.resolve([]);
    }

    addRoles(roleNames: IRoleDomain[]): Promise<void>
    {
        return Promise.resolve();
    }

    addRolesHasPermissions(data: IRolePermissionDomain[]): Promise<void>
    {
        return Promise.resolve();
    }
}

export default AuthMockRepository;
