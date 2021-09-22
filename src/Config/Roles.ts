import ItemPermissions from '../Item/Domain/Shared/ItemPermissions';
import SuperAdminRole from '../App/Domain/Shared/SuperAdminRole';
import AdminRole from '../App/Domain/Shared/AdminRole';
import OperatorRole from '../App/Domain/Shared/OperatorRole';
import IItemPermissions from '../Item/InterfaceAdapters/IItemPermissions';
import UserPermissions from '../User/Domain/Shared/UserPermissions';
import IUsersPermissions from '../User/InterfaceAdapters/IUsersPermissions';
import RolePermissions from '../Role/Domain/Shared/RolePermissions';
import IRolePermissions from '../Role/InterfaceAdapters/IRolePermissions';
import FilePermissions from '../File/Domain/Shared/FilePermissions';
import AuthPermissions from '../Auth/Domain/Shared/AuthPermissions';
import IAuthPermissions from '../Auth/InterfaceAdapters/IAuthPermissions';
import AppPermissions from '../App/Domain/Shared/AppPermissions';
import IAppPermissions from '../App/InterfaceAcapters/IAppPermissions';

class Roles
{
    static getRoles(): any
    {
        const superAmin = SuperAdminRole.I;
        const admin = AdminRole.I;
        const operator = OperatorRole.I;

        operator
            .extends(
                ItemPermissions.I
                    .exclude<IItemPermissions>(['DELETE', 'UPDATE'])
                    .get(),
                UserPermissions.I
                    .exclude<IUsersPermissions>(['CHANGE_USER_PASSWORD', 'DELETE', 'ASSIGN_ROLE'])
                    .get(),
                RolePermissions.I
                    .exclude<IRolePermissions>(['DELETE'])
                    .get(),
                FilePermissions.I.get(),
                AuthPermissions.I
                    .include<IAuthPermissions>(['KEEP_ALIVE'])
                    .get()
            );

        admin
            .extends(
                operator.get(),
                ItemPermissions.I.get(),
                UserPermissions.I.get(),
                RolePermissions.I
                    .include<IRolePermissions>(['DELETE'])
                    .get(),
                AuthPermissions.I
                    .include<IAuthPermissions>(['SYNC_PERMISSIONS'])
                    .get(),
                AppPermissions.I
                    .include<IAppPermissions>(['GET_PERMISSIONS'])
                    .get()
            );

        superAmin.allPermissions();

        return {
            [superAmin.NAME]: superAmin.get(),
            [admin.NAME]: admin.get(),
            [operator.NAME]: operator.get()
        };
    }
}

export default Roles;
