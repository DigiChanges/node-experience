import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';


class PasswordWrongException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'general.exceptions.passwordWrong';
        super({
            message: locales.__(key),
            errorCode: key
        }, PasswordWrongException.name);
    }
}

export default PasswordWrongException;
