import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../App/Presentation/Shared/Locales';


class DecryptForbiddenException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        super(locales.__('general.exceptions.decryptForbidden'), DecryptForbiddenException.name);
    }
}

export default DecryptForbiddenException;
