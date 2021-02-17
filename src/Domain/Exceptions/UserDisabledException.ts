import {ErrorException} from "@digichanges/shared-experience";

class UserDisabledException extends ErrorException
{
    constructor()
    {
        super('Your user is disable', UserDisabledException.name);
    }
}

export default UserDisabledException;
