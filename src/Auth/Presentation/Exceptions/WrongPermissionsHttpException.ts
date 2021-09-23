import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../../../App/Presentation/Shared/ErrorHttpException';
import { Locales } from '../../../App/Presentation/Shared/Express/AppExpress';

class WrongPermissionsHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_BAD_REQUEST, Locales.__('general.exceptions.wrongPermissions'), []);
    }
}

export default WrongPermissionsHttpException;
