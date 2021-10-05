import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../../../App/Presentation/Shared/ErrorHttpException';
import Locales from '../../../App/Presentation/Shared/Locales';


class TokenExpiredHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        super(StatusCode.HTTP_FORBIDDEN, locales.__('general.exceptions.tokenExpired'), []);
    }
}

export default TokenExpiredHttpException;
