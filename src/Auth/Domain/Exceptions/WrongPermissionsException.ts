import { ErrorException } from '@digichanges/shared-experience';

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
