import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import StatusCode from "../Shared/StatusCode";

class PasswordWrongHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, 'Your current password is wrong', []);
    }
}

export default PasswordWrongHttpException;
