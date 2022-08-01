import StatusCode from '../../../Shared/Application/StatusCode';
import ErrorHttpException from '../../../Shared/Presentation/Shared/ErrorHttpException';
import Locales from '../../../Shared/Presentation/Shared/Locales';

class ForbiddenHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.presentation.exceptions.forbidden';
        super(StatusCode.HTTP_FORBIDDEN, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default ForbiddenHttpException;
