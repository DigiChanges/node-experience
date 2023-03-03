import Permissions from '../../../../Config/Permissions';
import IGroupPermission from '../../../../Config/IGroupPermission';

class PermissionUseCase
{
    handle(): IGroupPermission[]
    {
        return Permissions.groupPermissions();
    }
}

export default PermissionUseCase;
