import { ErrorException } from '@digichanges/shared-experience';

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
