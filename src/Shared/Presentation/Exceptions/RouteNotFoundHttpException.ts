import ErrorHttpException from '../Shared/ErrorHttpException';
import Locales from '../Shared/Locales';
import StatusCode from '../../Application/StatusCode';

class RouteNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'app.presentation.exceptions.routeNotFound';
        super(StatusCode.HTTP_NOT_FOUND, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default RouteNotFoundHttpException;
