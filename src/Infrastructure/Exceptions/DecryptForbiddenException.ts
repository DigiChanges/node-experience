import ErrorException from "../../Application/Shared/ErrorException";

class DecryptForbiddenException extends ErrorException
{
    constructor()
    {
        super('Decrypt forbidden', DecryptForbiddenException.name);
    }
}

export default DecryptForbiddenException;
