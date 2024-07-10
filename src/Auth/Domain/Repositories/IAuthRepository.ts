import PermissionPayload from '../Payload/PermissionPayload';
import IUserDomain from '../Entities/IUserDomain';
import IRoleDomain from '../Entities/IRoleDomain';
import IPermissionDomain from '../Entities/IPermissionDomain';
import IRolePermissionDomain from '../Entities/IRolePermissionDomain';

abstract class IAuthRepository
{
    abstract checkPermissions(payload: PermissionPayload): Promise<boolean>;
    abstract getAuthUser(data: string): Promise<IUserDomain>;
    abstract getPermissions(): Promise<IPermissionDomain[]>;
    abstract addPermissions(permissions: string[]): Promise<void>;
    abstract removePermissions(permissions: string[]): Promise<void>;
    abstract getRoles(): Promise<IRoleDomain[]>;
    abstract addRoles(roleNames: IRoleDomain[]): Promise<void>;
    abstract addRolesHasPermissions(data: IRolePermissionDomain[]): Promise<void>;
}

export default IAuthRepository;
