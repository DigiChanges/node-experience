import { ErrorException } from '../../../Main/Domain/Errors/ErrorException';

class BadCredentialsException extends ErrorException
{
    constructor()
    {
        const key = 'auth.domain.exceptions.badCredentials';
        super({
            message: 'Error credentials.',
            errorCode: key
        }, BadCredentialsException.name);
    }
}

export default BadCredentialsException;
