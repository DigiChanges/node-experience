import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';


class WrongPermissionsException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        super(locales.__('general.exceptions.wrongPermissions'), WrongPermissionsException.name);
    }
}

export default WrongPermissionsException;
