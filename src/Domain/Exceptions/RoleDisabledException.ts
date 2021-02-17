import {ErrorException} from "@digichanges/shared-experience";

class RoleDisabledException extends ErrorException
{
    constructor()
    {
        super('Your role is disable', RoleDisabledException.name);
    }
}

export default RoleDisabledException;
