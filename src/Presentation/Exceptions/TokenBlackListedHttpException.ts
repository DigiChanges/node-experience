import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import {StatusCode} from "@digichanges/shared-experience";

class TokenBlackListedHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, 'Token black listed', []);
    }
}

export default TokenBlackListedHttpException;
