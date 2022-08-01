import ErrorException from '../../../Shared/Exceptions/ErrorException';
import Locales from '../../../Shared/Presentation/Shared/Locales';

class WrongPermissionsException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.exceptions.wrongPermissions';
        super({
            message: locales.__(key),
            errorCode: key
        }, WrongPermissionsException.name);
    }
}

export default WrongPermissionsException;
