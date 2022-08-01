import ErrorHttpException from '../../../Shared/Presentation/Shared/ErrorHttpException';
import Locales from '../../../Shared/Presentation/Shared/Locales';
import StatusCode from '../../../Shared/Application/StatusCode';

class TokenBlackListedHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.presentation.exceptions.tokenBlackListed';
        super(StatusCode.HTTP_FORBIDDEN, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default TokenBlackListedHttpException;
