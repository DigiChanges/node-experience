import ErrorException from "../../Application/Shared/ErrorException";

class CantDisabledException extends ErrorException
{
    constructor()
    {
        super("SuperAdmin can't be disable", CantDisabledException.name);
    }
}

export default CantDisabledException;
