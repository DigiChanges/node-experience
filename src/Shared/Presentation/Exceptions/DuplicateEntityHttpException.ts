import ErrorHttpException from '../Shared/ErrorHttpException';
import Locales from '../Shared/Locales';
import StatusCode from '../../Application/StatusCode';

class DuplicateEntityHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'app.presentation.exceptions.duplicateEntity';
        super(StatusCode.HTTP_BAD_REQUEST, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default DuplicateEntityHttpException;
