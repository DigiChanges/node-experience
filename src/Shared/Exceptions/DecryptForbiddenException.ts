import Locales from '../Presentation/Shared/Locales';
import ErrorException from './ErrorException';

class DecryptForbiddenException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'shared.exceptions.decryptForbidden';
        super({
            message: locales.__(key),
            errorCode: key
        }, DecryptForbiddenException.name);
    }
}

export default DecryptForbiddenException;
