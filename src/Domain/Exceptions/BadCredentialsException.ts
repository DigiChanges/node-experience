import ErrorException from "../../Application/Shared/ErrorException";

class BadCredentialsException extends ErrorException
{
    constructor()
    {
        super('Error credentials', BadCredentialsException.name);
    }
}

export default BadCredentialsException;
