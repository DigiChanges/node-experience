import {ErrorException} from '@digichanges/shared-experience';
import {Locales} from '../../../app';

class WrongPermissionsException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.wrongPermissions'), WrongPermissionsException.name);
    }
}

export default WrongPermissionsException;
