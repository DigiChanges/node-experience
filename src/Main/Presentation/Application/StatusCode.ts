import { IHttpStatusCode } from './IHttpStatusCode';

export class StatusCode
{
    public static HTTP_CONTINUE: IHttpStatusCode = { code: 100, statusCode: 'HTTP_CONTINUE', status: '' };
    public static HTTP_SWITCHING_PROTOCOLS: IHttpStatusCode = { code: 101, statusCode: 'HTTP_SWITCHING_PROTOCOLS', status: '' };
    public static HTTP_OK: IHttpStatusCode = { code: 200, statusCode: 'HTTP_OK', status: 'success' };
    public static HTTP_CREATED: IHttpStatusCode = { code: 201, statusCode: 'HTTP_CREATED', status: 'success' };
    public static HTTP_ACCEPTED: IHttpStatusCode = { code: 202, statusCode: 'HTTP_ACCEPTED', status: 'success' };
    public static HTTP_NO_CONTENT: IHttpStatusCode = { code: 204, statusCode: 'HTTP_NO_CONTENT', status: 'success' };
    public static HTTP_MULTIPLE_CHOICES: IHttpStatusCode = { code: 300, statusCode: 'HTTP_MULTIPLE_CHOICES', status: '' };
    public static HTTP_MOVED_PERMANENTLY: IHttpStatusCode = { code: 301, statusCode: 'HTTP_MOVED_PERMANENTLY', status: '' };
    public static HTTP_NOT_MODIFIED: IHttpStatusCode = { code: 304, statusCode: 'HTTP_NOT_MODIFIED', status: '' };
    public static HTTP_BAD_REQUEST: IHttpStatusCode = { code: 400, statusCode: 'HTTP_BAD_REQUEST', status: 'error' };
    public static HTTP_UNAUTHORIZED: IHttpStatusCode = { code: 401, statusCode: 'HTTP_UNAUTHORIZED', status: 'error' };
    public static HTTP_PAYMENT_REQUIRED: IHttpStatusCode = { code: 402, statusCode: 'HTTP_PAYMENT_REQUIRED', status: 'error' };
    public static HTTP_FORBIDDEN: IHttpStatusCode = { code: 403, statusCode: 'HTTP_FORBIDDEN', status: 'error' };
    public static HTTP_NOT_FOUND: IHttpStatusCode = { code: 404, statusCode: 'HTTP_NOT_FOUND', status: 'error' };
    public static HTTP_METHOD_NOT_ALLOWED: IHttpStatusCode = { code: 405, statusCode: 'HTTP_METHOD_NOT_ALLOWED', status: 'error' };
    public static HTTP_REQUEST_TIMEOUT: IHttpStatusCode = { code: 408, statusCode: 'HTTP_REQUEST_TIMEOUT', status: 'error' };
    public static HTTP_REQUEST_ENTITY_TOO_LARGE: IHttpStatusCode = { code: 413, statusCode: 'HTTP_REQUEST_ENTITY_TOO_LARGE', status: 'error' };
    public static HTTP_REQUEST_URI_TOO_LONG: IHttpStatusCode = { code: 414, statusCode: 'HTTP_REQUEST_URI_TOO_LONG', status: 'error' };
    public static HTTP_UNSUPPORTED_MEDIA_TYPE: IHttpStatusCode = { code: 415, statusCode: 'HTTP_UNSUPPORTED_MEDIA_TYPE', status: 'error' };
    public static HTTP_UNPROCESSABLE_ENTITY: IHttpStatusCode = { code: 422, statusCode: 'HTTP_UNPROCESSABLE_ENTITY', status: 'error' };
    public static HTTP_TOO_MANY_REQUESTS: IHttpStatusCode = { code: 429, statusCode: 'HTTP_TOO_MANY_REQUESTS', status: 'error' };
    public static HTTP_INTERNAL_SERVER_ERROR: IHttpStatusCode = { code: 500, statusCode: 'HTTP_INTERNAL_SERVER_ERROR', status: 'error' };
    public static HTTP_NOT_IMPLEMENTED: IHttpStatusCode = { code: 501, statusCode: 'HTTP_NOT_IMPLEMENTED', status: 'error' };
    public static HTTP_BAD_GATEWAY: IHttpStatusCode = { code: 502, statusCode: 'HTTP_BAD_GATEWAY', status: 'error' };
    public static HTTP_SERVICE_UNAVAILABLE: IHttpStatusCode = { code: 503, statusCode: 'HTTP_SERVICE_UNAVAILABLE', status: 'error' };
    public static HTTP_GATEWAY_TIMEOUT: IHttpStatusCode = { code: 504, statusCode: 'HTTP_GATEWAY_TIMEOUT', status: 'error' };

    public static searchByCodeNumber(code: number): IHttpStatusCode
    {
        const keys = Object.keys(StatusCode) as (keyof typeof StatusCode)[];

        for (const key of keys)
        {
            if ((StatusCode[key] as IHttpStatusCode)?.code === code)
            {
                return <IHttpStatusCode>StatusCode[key];
            }
        }

        return StatusCode.HTTP_OK;
    }
}
