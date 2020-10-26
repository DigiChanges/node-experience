import ErrorException from "../../Application/Shared/ErrorException";

class UserDisabledException extends ErrorException
{
    constructor()
    {
        super('Your user is disable', UserDisabledException.name);
    }
}

export default UserDisabledException;
