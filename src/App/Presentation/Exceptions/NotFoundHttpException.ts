import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';
import Locales from '../Shared/Locales';

class NotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'general.exceptions.notFound';
        super(StatusCode.HTTP_BAD_REQUEST, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default NotFoundHttpException;
