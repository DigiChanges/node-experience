import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';


class BadCredentialsException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        super(locales.__('general.exceptions.badCredentials'), BadCredentialsException.name);
    }
}

export default BadCredentialsException;
