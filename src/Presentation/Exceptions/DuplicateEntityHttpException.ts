import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import {StatusCode} from "@digichanges/shared-experience";

class DuplicateEntityHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_UNPROCESSABLE_ENTITY, "Duplicate entity.", []);
    }
}

export default DuplicateEntityHttpException;
