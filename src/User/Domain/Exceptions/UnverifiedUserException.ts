import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';

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
