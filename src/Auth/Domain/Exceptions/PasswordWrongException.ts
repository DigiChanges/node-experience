import {ErrorException} from '@digichanges/shared-experience';
import {Locales} from '../../../app';

class PasswordWrongException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.passwordWrong'), PasswordWrongException.name);
    }
}

export default PasswordWrongException;
