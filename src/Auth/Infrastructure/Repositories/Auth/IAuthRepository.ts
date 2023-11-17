import PermissionPayload from './Payload/PermissionPayload';
import IUserDomain from '../../../Domain/Entities/IUserDomain';
import IRoleDomain from '../../../Domain/Entities/IRoleDomain';
import IPermissionDomain from '../../../Domain/Entities/IPermissionDomain';
import IRolePermissionDomain from '../../../Domain/Entities/IRolePermissionDomain';

interface IAuthRepository
{
    checkPermissions(payload: PermissionPayload): Promise<boolean>;
    getAuthUser(data: string): Promise<IUserDomain>;
    getPermissions(): Promise<IPermissionDomain[]>;
    addPermissions(permissions: string[]): Promise<void>;
    removePermissions(permissions: string[]): Promise<void>;
    getRoles(): Promise<IRoleDomain[]>;
    addRoles(roleNames: IRoleDomain[]): Promise<void>;
    addRolesHasPermissions(data: IRolePermissionDomain[]): Promise<void>;
}

export default IAuthRepository;
