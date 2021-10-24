import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';
import Locales from '../Shared/Locales';

class DuplicateEntityHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'general.exceptions.duplicateEntity';
        super(StatusCode.HTTP_UNPROCESSABLE_ENTITY, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default DuplicateEntityHttpException;
