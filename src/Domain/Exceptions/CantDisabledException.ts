import {ErrorException} from '@digichanges/shared-experience';
import {Locales} from '../../Application/app';

class CantDisabledException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.cantDisabled'), CantDisabledException.name);
    }
}

export default CantDisabledException;
