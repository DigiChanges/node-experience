import Permissions from '../../../Config/Permissions';
import _ from 'lodash';

class PermissionUseCase
{
    handle()
    {
        return _.flatMap(Permissions.permissions());
    }
}

export default PermissionUseCase;
