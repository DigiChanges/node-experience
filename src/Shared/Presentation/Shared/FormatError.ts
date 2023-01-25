import ErrorHttpException from './ErrorHttpException';
import MainConfig from '../../../Config/MainConfig';

class FormatError
{
    getFormat = (errorHttpException: ErrorHttpException): any =>
    {
        const { statusCode, message, errors, metadata, errorCode } = errorHttpException;
        const config = MainConfig.getInstance().getConfig().statusCode;

        return {
            message: statusCode.code === config['HTTP_INTERNAL_SERVER_ERROR'].code ? 'Internal Error Server' : message,
            errorCode,
            errors,
            metadata
        };
    };
}

export default FormatError;
