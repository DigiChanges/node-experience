import {ErrorException} from "@digichanges/shared-experience";

class BadCredentialsException extends ErrorException
{
    constructor()
    {
        super('Error credentials', BadCredentialsException.name);
    }
}

export default BadCredentialsException;
