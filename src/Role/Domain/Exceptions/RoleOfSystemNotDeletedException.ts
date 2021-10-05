import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../../App/Presentation/Shared/Locales';


class RoleOfSystemNotDeletedException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        super(locales.__('general.exceptions.roleOfSystemNotDeleted'), RoleOfSystemNotDeletedException.name);
    }
}

export default RoleOfSystemNotDeletedException;
