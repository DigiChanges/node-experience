import StatusCode from "./StatusCode";

class FormatError
{
    getFormat = (message: any, statusCode: number): any =>
    {
        return {
            'status': 'error',
            'code': statusCode,
            'message': statusCode === StatusCode.HTTP_INTERNAL_SERVER_ERROR ? 'Internal Error Server' : message
        };
    };
}

export default FormatError;