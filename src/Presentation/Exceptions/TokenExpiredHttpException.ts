import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import {StatusCode} from "@digichanges/shared-experience";

class TokenExpiredHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, 'You must be authenticated', []);
    }
}

export default TokenExpiredHttpException;
