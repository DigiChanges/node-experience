import { ErrorException } from '../../../Main/Domain/Errors/ErrorException';

class UserDisabledException extends ErrorException
{
    constructor()
    {
        const key = 'user.domain.exceptions.userDisabled';
        super({
            message: 'Your user is disable.',
            errorCode: key
        }, UserDisabledException.name);
    }
}

export default UserDisabledException;
