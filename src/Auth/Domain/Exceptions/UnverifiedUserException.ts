import ErrorException from '../../../Shared/Exceptions/ErrorException';
import Locales from '../../../Shared/Presentation/Shared/Locales';

class UnverifiedUserException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'user.domain.exceptions.unverifiedUser';
        super({
            message: locales.__(key),
            errorCode: key
        }, UnverifiedUserException.name);
    }
}

export default UnverifiedUserException;
