import {ErrorException} from "@digichanges/shared-experience";

class NotFoundException extends ErrorException
{
    constructor(entity: string)
    {
        super(`${entity} Not Found`, NotFoundException.name);
    }
}

export default NotFoundException;
