import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';

class InvalidPasswordException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'app.domain.exceptions.invalidPassword';
        super({
            message: locales.__(key),
            errorCode: key
        }, InvalidPasswordException.name);
    }
}

export default InvalidPasswordException;
