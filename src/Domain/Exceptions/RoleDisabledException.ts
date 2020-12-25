import ErrorException from "../../Application/Shared/ErrorException";

class RoleDisabledException extends ErrorException
{
    constructor()
    {
        super('Your role is disable', RoleDisabledException.name);
    }
}

export default RoleDisabledException;
