import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';
import Locales from '../Shared/Locales';

class DecryptForbiddenHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        super(StatusCode.HTTP_FORBIDDEN, locales.__('general.exceptions.decryptForbidden'), []);
    }
}

export default DecryptForbiddenHttpException;
