import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';

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
