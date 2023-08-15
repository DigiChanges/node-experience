import { ErrorException } from '@digichanges/shared-experience';

class UnverifiedUserException extends ErrorException
{
    constructor()
    {
        const key = 'user.domain.exceptions.unverifiedUser';
        super({
            message: 'This user is not verified.',
            errorCode: key
        }, UnverifiedUserException.name);
    }
}

export default UnverifiedUserException;
