import ErrorException from '../../../Shared/Exceptions/ErrorException';
import Locales from '../../../Shared/Presentation/Shared/Locales';

class UserDisabledException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'user.domain.exceptions.userDisabled';
        super({
            message: locales.__(key),
            errorCode: key
        }, UserDisabledException.name);
    }
}

export default UserDisabledException;
