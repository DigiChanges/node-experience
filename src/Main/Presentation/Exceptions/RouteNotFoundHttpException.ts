import { StatusCode, ErrorHttpException } from '@digichanges/shared-experience';

class RouteNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        const key = 'app.presentation.exceptions.routeNotFound';
        super(StatusCode.HTTP_NOT_FOUND, {
            message: 'Route not found.',
            errorCode: key
        });
    }
}

export default RouteNotFoundHttpException;
