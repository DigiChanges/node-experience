import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';

class WrongPermissionsException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.exceptions.wrongPermissions';
        super({
            message: locales.__(key),
            errorCode: key
        }, WrongPermissionsException.name);
    }
}

export default WrongPermissionsException;
