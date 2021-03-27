import {StatusCode} from '@digichanges/shared-experience';
import ErrorHttpException from '../../Application/Shared/ErrorHttpException';
import {Locales} from '../../Application/app';

class ForbiddenHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, Locales.__('general.exceptions.forbidden'), []);
    }
}

export default ForbiddenHttpException;
