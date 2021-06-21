import {ErrorException} from '@digichanges/shared-experience';
import {Locales} from '../../../App/Presentation/Shared/Express/AppExpress';

class CantDisabledException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.cantDisabled'), CantDisabledException.name);
    }
}

export default CantDisabledException;
