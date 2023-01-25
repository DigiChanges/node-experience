import ErrorHttpException from '../Shared/ErrorHttpException';
import Locales from '../Shared/Locales';
import MainConfig from '../../../Config/MainConfig';

const config = MainConfig.getInstance().getConfig().statusCode;

class RouteNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'app.presentation.exceptions.routeNotFound';
        super(config['HTTP_NOT_FOUND'], {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default RouteNotFoundHttpException;
