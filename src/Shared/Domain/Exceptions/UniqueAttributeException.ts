import ErrorException from '../../../Shared/Exceptions/ErrorException';
import Locales from '../../Presentation/Shared/Locales';

class UniqueAttributeException extends ErrorException
{
    constructor(name: string | any)
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'app.domain.exceptions.uniqueAttribute';
        super({
            message: locales.__(key, { name }),
            errorCode: key
        }, UniqueAttributeException.name, { replace:{ name } });
    }
}

export default UniqueAttributeException;
