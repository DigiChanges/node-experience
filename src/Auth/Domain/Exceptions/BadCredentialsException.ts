import ErrorException from '../../../Shared/Exceptions/ErrorException';
import Locales from '../../../Shared/Presentation/Shared/Locales';

class BadCredentialsException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.exceptions.badCredentials';
        super({
            message: locales.__(key),
            errorCode: key
        }, BadCredentialsException.name);
    }
}

export default BadCredentialsException;
