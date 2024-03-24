import { ErrorException } from '../Errors/ErrorException';

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
