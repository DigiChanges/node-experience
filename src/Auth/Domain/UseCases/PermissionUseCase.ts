import Permissions from '../../../Config/Permissions';
import IGroupPermission from '../../InterfaceAdapters/IGroupPermission';

class PermissionUseCase
{
    handle(): IGroupPermission[]
    {
        return Permissions.groupPermissions();
    }
}

export default PermissionUseCase;
