import { isEmpty, intersection } from 'lodash';
import Permissions from '../../Config/Permissions';
import WrongPermissionsException from '../../Auth/Domain/Exceptions/WrongPermissionsException';

class AuthHelper
{
    static validatePermissions(permissions: string[]): void
    {
        if (!isEmpty(permissions) && isEmpty(intersection(permissions, Permissions.permissions())))
        {
            throw new WrongPermissionsException();
        }
    }
}

export default AuthHelper;
