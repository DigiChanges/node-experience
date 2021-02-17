import {ErrorException} from "@digichanges/shared-experience";

class PasswordWrongException extends ErrorException
{
    constructor()
    {
        super('Your current password is wrong', PasswordWrongException.name);
    }
}

export default PasswordWrongException;
