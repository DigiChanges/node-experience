import { ErrorHttpException } from './ErrorHttpException';
import { StatusCode } from '../Application/StatusCode';

class DuplicateEntityHttpException extends ErrorHttpException
{
    constructor()
    {
        const key = 'app.presentation.exceptions.duplicateEntity';
        super({
            statusCode: StatusCode.HTTP_BAD_REQUEST,
            errorMessage:
            {
                message: 'Duplicate entity.',
                errorCode: key
            }
        });
    }
}

export default DuplicateEntityHttpException;
