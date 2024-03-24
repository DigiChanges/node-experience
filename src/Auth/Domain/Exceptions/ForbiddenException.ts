import { ErrorException } from '../../../Main/Domain/Errors/ErrorException';

class ForbiddenException extends ErrorException
{
    constructor()
    {
        const key = 'auth.domain.exceptions.forbidden';
        super({
            message: 'Forbidden.',
            errorCode: key
        }, ForbiddenException.name);
    }
}

export default ForbiddenException;
