import {ErrorException} from '@digichanges/shared-experience';
import {Locales} from '../../App/Presentation/Shared/Express/AppExpress';

class DecryptForbiddenException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.decryptForbidden'), DecryptForbiddenException.name);
    }
}

export default DecryptForbiddenException;
