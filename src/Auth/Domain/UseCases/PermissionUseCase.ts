import Permissions from '../../../Config/Permissions';
import IGroupPermission from '../../../Shared/InterfaceAdapters/IGroupPermission';

class PermissionUseCase
{
    handle(): IGroupPermission[]
    {
        return Permissions.groupPermissions();
    }
}

export default PermissionUseCase;
