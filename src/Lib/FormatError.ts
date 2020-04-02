
class FormatError
{
    getFormat = (message: any, statusCode: number): any =>
    {
        return {
            'status': 'error',
            'code': statusCode,
            'message': message
        };
    };
}

export default FormatError;