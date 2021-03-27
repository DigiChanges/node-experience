import {ErrorException} from '@digichanges/shared-experience';
import {Locales} from '../../Application/app';

class DecryptForbiddenException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.decryptForbidden'), DecryptForbiddenException.name);
    }
}

export default DecryptForbiddenException;
