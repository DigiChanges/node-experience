import {ErrorException} from "@digichanges/shared-experience";

class WrongPermissionsException extends ErrorException
{
    constructor()
    {
        super('Wrong Permissions', WrongPermissionsException.name);
    }
}

export default WrongPermissionsException;
