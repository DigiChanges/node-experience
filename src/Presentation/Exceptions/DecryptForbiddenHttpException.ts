import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import StatusCode from "../Shared/StatusCode";

class DecryptForbiddenHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, 'Decrypt forbidden');
    }
}

export default DecryptForbiddenHttpException;
