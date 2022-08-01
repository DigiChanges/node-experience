import ErrorException from '../../../Shared/Exceptions/ErrorException';
import Locales from '../../../Shared/Presentation/Shared/Locales';

class CantDisabledException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.exceptions.cantDisabled';
        super({
            message: locales.__(key),
            errorCode: key
        }, CantDisabledException.name);
    }
}

export default CantDisabledException;
