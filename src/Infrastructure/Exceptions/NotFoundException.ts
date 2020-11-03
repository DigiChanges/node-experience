import ErrorException from "../../Application/Shared/ErrorException";

class NotFoundException extends ErrorException
{
    constructor(entity: string)
    {
        super(`${entity} Not Found`, NotFoundException.name);
    }
}

export default NotFoundException;
