import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../App/Presentation/Shared/Locales';


class NotFoundException extends ErrorException
{
    constructor(entity: string)
    {
        const locales = Locales.getInstance().getLocales();
        super(`${entity} ${locales.__('general.exceptions.notFound')}`, NotFoundException.name);
    }
}

export default NotFoundException;
