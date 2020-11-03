import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import StatusCode from "../Shared/StatusCode";

class NotFoundHttpException extends ErrorHttpException
{
    constructor(message: string)
    {
        super(StatusCode.HTTP_BAD_REQUEST, message);
    }
}

export default NotFoundHttpException;
