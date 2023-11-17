import { ErrorException } from '@digichanges/shared-experience';

class PasswordWrongException extends ErrorException
{
    constructor()
    {
        const key = 'auth.domain.exceptions.passwordWrong';
        super({
            message: 'Wrong password.',
            errorCode: key
        }, PasswordWrongException.name);
    }
}

export default PasswordWrongException;
