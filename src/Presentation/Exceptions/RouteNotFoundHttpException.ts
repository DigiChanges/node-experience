import {StatusCode} from "@digichanges/shared-experience";
import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import {Locales} from "../../Application/app";

class RouteNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_NOT_FOUND, Locales.__('general.exceptions.routeNotFound'), []);
    }
}

export default RouteNotFoundHttpException;
