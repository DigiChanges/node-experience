import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';


class PasswordWrongException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        super(locales.__('general.exceptions.passwordWrong'), PasswordWrongException.name);
    }
}

export default PasswordWrongException;
