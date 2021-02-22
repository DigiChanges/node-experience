import {StatusCode} from "@digichanges/shared-experience";
import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import {Locales} from "../../Application/app";

class DuplicateEntityHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_UNPROCESSABLE_ENTITY, Locales.__('general.exceptions.duplicateEntity'), []);
    }
}

export default DuplicateEntityHttpException;
