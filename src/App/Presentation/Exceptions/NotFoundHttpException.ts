import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';
import { Locales } from '../Shared/Express/AppExpress';

class NotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_BAD_REQUEST, Locales.__('general.exceptions.notFound'), []);
    }
}

export default NotFoundHttpException;
