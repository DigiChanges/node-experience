import ErrorException from '../../../Shared/Exceptions/ErrorException';
import Locales from '../../../Shared/Presentation/Shared/Locales';

class RoleOfSystemNotDeletedException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'role.domain.exceptions.roleOfSystemNotDeleted';
        super({
            message:  locales.__(key),
            errorCode: key
        }, RoleOfSystemNotDeletedException.name);
    }
}

export default RoleOfSystemNotDeletedException;
