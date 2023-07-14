import { ErrorException } from '@digichanges/shared-experience';

class UniqueAttributeException extends ErrorException
{
    constructor(name: string | any)
    {
        const key = 'app.domain.exceptions.uniqueAttribute';
        super({
            message: `The ${name} property is already in use.`,
            errorCode: key
        }, UniqueAttributeException.name, { replace:{ name } });
    }
}

export default UniqueAttributeException;
