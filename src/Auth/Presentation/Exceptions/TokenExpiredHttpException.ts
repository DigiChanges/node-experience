import ErrorHttpException from '../../../Shared/Exceptions/ErrorHttpException';
import Locales from '../../../Shared/Utils/Locales';
import MainConfig from '../../../Config/MainConfig';

const config = MainConfig.getInstance().getConfig().statusCode;

class TokenExpiredHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.presentation.exceptions.tokenExpired';
        super(config['HTTP_FORBIDDEN'], {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default TokenExpiredHttpException;
