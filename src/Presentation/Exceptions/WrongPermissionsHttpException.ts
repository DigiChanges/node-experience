import {StatusCode} from "@digichanges/shared-experience";
import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import {Locales} from "../../Application/app";

class WrongPermissionsHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_BAD_REQUEST, Locales.__('general.exceptions.wrongPermissions'), []);
    }
}

export default WrongPermissionsHttpException;
