import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../../../App/Presentation/Shared/ErrorHttpException';
import { Locales } from '../../../App/Presentation/Shared/Express/AppExpress';

class RoleDisabledHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, Locales.__('general.exceptions.roleDisabled'), []);
    }
}

export default RoleDisabledHttpException;
