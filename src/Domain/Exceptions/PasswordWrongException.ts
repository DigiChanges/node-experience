import ErrorException from "../../Application/Shared/ErrorException";

class PasswordWrongException extends ErrorException
{
    constructor()
    {
        super('Your current password is wrong', PasswordWrongException.name);
    }
}

export default PasswordWrongException;
