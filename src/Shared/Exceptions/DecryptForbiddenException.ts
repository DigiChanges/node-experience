import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../App/Presentation/Shared/Locales';

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
