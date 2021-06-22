import Permissions from '../../../Config/Permissions';

class PermissionUseCase
{
    handle(): {[key: string]: string[]}
    {
        return Permissions.groupPermissions();
    }
}

export default PermissionUseCase;
