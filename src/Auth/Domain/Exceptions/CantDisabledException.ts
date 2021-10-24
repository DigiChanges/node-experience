import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';

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
