import ErrorException from '../../../Shared/Exceptions/ErrorException';
import Locales from '../../../Shared/Presentation/Shared/Locales';

class RoleDisabledException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'role.domain.exceptions.roleDisabled';
        super({
            message: locales.__(key),
            errorCode: key
        }, RoleDisabledException.name);
    }
}

export default RoleDisabledException;
