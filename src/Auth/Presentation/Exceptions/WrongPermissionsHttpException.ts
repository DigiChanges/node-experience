import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../../../App/Presentation/Shared/ErrorHttpException';
import Locales from '../../../App/Presentation/Shared/Locales';

class WrongPermissionsHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.presentation.exceptions.wrongPermissions';
        super(StatusCode.HTTP_BAD_REQUEST, {
            message: locales.__(key),
            errorCode: key
        }, []);
    }
}

export default WrongPermissionsHttpException;
