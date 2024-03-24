import { ErrorException } from '../../../Main/Domain/Errors/ErrorException';

class CantDisabledException extends ErrorException
{
    constructor()
    {
        const key = 'auth.domain.exceptions.cantDisabled';
        super({
            message: 'Disabled forbidden.',
            errorCode: key
        }, CantDisabledException.name);
    }
}

export default CantDisabledException;
