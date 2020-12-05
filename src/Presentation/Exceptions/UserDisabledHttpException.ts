import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import StatusCode from "../Shared/StatusCode";

class UserDisabledHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, 'Your user is disable', []);
    }
}

export default UserDisabledHttpException;
