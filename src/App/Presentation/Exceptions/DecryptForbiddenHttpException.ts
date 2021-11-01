import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';

class DecryptForbiddenHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN);
    }
}

export default DecryptForbiddenHttpException;
