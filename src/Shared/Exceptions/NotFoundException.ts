import Locales from '../Presentation/Shared/Locales';
import ErrorException from './ErrorException';

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
