import ErrorException from '../../../Shared/Exceptions/ErrorException';
import Locales from '../../../Shared/Presentation/Shared/Locales';

class PasswordWrongException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.exceptions.passwordWrong';
        super({
            message: locales.__(key),
            errorCode: key
        }, PasswordWrongException.name);
    }
}

export default PasswordWrongException;
