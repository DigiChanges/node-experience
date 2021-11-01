import { ErrorException } from '@digichanges/shared-experience';
import Locales from '../../App/Presentation/Shared/Locales';

class NotFoundException extends ErrorException
{
    constructor(entity: string)
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'shared.exceptions.notFound';
        super({
            message: `${entity} ${locales.__(key)}`,
            errorCode: key
        }, NotFoundException.name, { entity });
    }
}

export default NotFoundException;
