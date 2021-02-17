import {ErrorException} from "@digichanges/shared-experience";

class CantDisabledException extends ErrorException
{
    constructor()
    {
        super("SuperAdmin can't be disable", CantDisabledException.name);
    }
}

export default CantDisabledException;
