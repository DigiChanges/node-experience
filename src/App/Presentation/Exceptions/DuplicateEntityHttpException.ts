import {StatusCode} from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';
import {Locales} from '../../../app';

class DuplicateEntityHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_UNPROCESSABLE_ENTITY, Locales.__('general.exceptions.duplicateEntity'), []);
    }
}

export default DuplicateEntityHttpException;
