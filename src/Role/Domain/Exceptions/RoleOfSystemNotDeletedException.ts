import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';

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
