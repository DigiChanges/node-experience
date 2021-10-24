import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';


class RoleDisabledException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'general.exceptions.roleDisabled';
        super({
            message: locales.__(key),
            errorCode: key
        }, RoleDisabledException.name);
    }
}

export default RoleDisabledException;
