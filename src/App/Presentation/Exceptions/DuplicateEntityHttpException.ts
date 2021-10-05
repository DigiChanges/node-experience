import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';
import Locales from '../Shared/Locales';

class DuplicateEntityHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        super(StatusCode.HTTP_UNPROCESSABLE_ENTITY, locales.__('general.exceptions.duplicateEntity'), []);
    }
}

export default DuplicateEntityHttpException;
