import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';
import { Locales } from '../Shared/Express/AppExpress';

class DecryptForbiddenHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, Locales.__('general.exceptions.decryptForbidden'), []);
    }
}

export default DecryptForbiddenHttpException;
