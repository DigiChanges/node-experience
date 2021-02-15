import {ErrorException} from "@digichanges/shared-experience";

class DecryptForbiddenException extends ErrorException
{
    constructor()
    {
        super('Decrypt forbidden', DecryptForbiddenException.name);
    }
}

export default DecryptForbiddenException;
