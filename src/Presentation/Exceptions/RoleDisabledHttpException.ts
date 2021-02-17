import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import {StatusCode} from "@digichanges/shared-experience";

class RoleDisabledHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, 'Your role is disable', []);
    }
}

export default RoleDisabledHttpException;
