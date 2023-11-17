import { ErrorException } from '@digichanges/shared-experience';

class InvalidPasswordException extends ErrorException
{
    constructor()
    {
        const key = 'app.domain.exceptions.invalidPassword';
        super({
            message: 'Invalid Password.',
            errorCode: key
        }, InvalidPasswordException.name);
    }
}

export default InvalidPasswordException;
