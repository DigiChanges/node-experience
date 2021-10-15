import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../../../App/Presentation/Shared/ErrorHttpException';
import Locales from '../../../App/Presentation/Shared/Locales';


class WrongPermissionsHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        super(StatusCode.HTTP_BAD_REQUEST, locales.__('general.exceptions.wrongPermissions'), []);
    }
}

export default WrongPermissionsHttpException;
