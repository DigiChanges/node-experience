import { ErrorException } from '@digichanges/shared-experience';
import { Locales } from '../../../App/Presentation/Shared/Express/AppExpress';

class WrongPermissionsException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.wrongPermissions'), WrongPermissionsException.name);
    }
}

export default WrongPermissionsException;
