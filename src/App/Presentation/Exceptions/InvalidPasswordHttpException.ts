import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../Shared/ErrorHttpException';

class InvalidPasswordHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_UNPROCESSABLE_ENTITY);
    }
}

export default InvalidPasswordHttpException;
