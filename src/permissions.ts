import AppPermissions from './App/Domain/Shared/AppPermissions';
import AuthPermissions from './Auth/Domain/Shared/AuthPermissions';
import UserPermissions from './User/Domain/Shared/UserPermissions';
import RolePermissions from './Role/Domain/Shared/RolePermissions';
import FilePermissions from './File/Domain/Shared/FilePermissions';
import ItemPermissions from './Item/Domain/Shared/ItemPermissions';

const permissions = [
    AppPermissions.I,
    AuthPermissions.I,
    UserPermissions.I,
    RolePermissions.I,
    FilePermissions.I,
    ItemPermissions.I
];

export default permissions;

