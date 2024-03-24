import { ErrorException } from '../../../Main/Domain/Errors/ErrorException';

class WrongPermissionsException extends ErrorException
{
    constructor()
    {
        const key = 'auth.domain.exceptions.wrongPermissions';
        super({
            message: 'Wrong permissions.',
            errorCode: key
        }, WrongPermissionsException.name);
    }
}

export default WrongPermissionsException;
