import ErrorHttpException from '../../../Shared/Presentation/Shared/ErrorHttpException';
import Locales from '../../../Shared/Presentation/Shared/Locales';
import StatusCode from '../../../Shared/Application/StatusCode';

class TokenNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.presentation.exceptions.tokenNotFound';
        super(StatusCode.HTTP_FORBIDDEN, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default TokenNotFoundHttpException;
