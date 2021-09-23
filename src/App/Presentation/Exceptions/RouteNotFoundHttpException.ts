import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';
import { Locales } from '../Shared/Express/AppExpress';

class RouteNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_NOT_FOUND, Locales.__('general.exceptions.routeNotFound'), []);
    }
}

export default RouteNotFoundHttpException;
