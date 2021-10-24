import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../../../App/Presentation/Shared/ErrorHttpException';
import Locales from '../../../App/Presentation/Shared/Locales';


class RoleOfSystemNotDeletedHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'general.exceptions.roleOfSystemNotDeleted';
        super(StatusCode.HTTP_FORBIDDEN, {
            message:  locales.__(key),
            errorCode: key
        });
    }
}

export default RoleOfSystemNotDeletedHttpException;
