import ErrorException from "../../Application/Shared/ErrorException";

class WrongPermissionsException extends ErrorException
{
    constructor()
    {
        super('Wrong Permissions', WrongPermissionsException.name);
    }
}

export default WrongPermissionsException;
