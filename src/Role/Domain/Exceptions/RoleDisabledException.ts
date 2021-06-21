import {ErrorException} from '@digichanges/shared-experience';
import {Locales} from '../../../App/Presentation/Shared/Express/AppExpress';

class RoleDisabledException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.roleDisabled'), RoleDisabledException.name);
    }
}

export default RoleDisabledException;
