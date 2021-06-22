import {ErrorException} from '@digichanges/shared-experience';
import {Locales} from '../../../App/Presentation/Shared/Express/AppExpress';

class RoleOfSystemNotDeletedException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.roleOfSystemNotDeleted'), RoleOfSystemNotDeletedException.name);
    }
}

export default RoleOfSystemNotDeletedException;
