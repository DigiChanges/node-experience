
// TODO: Modified result on an concret/abstract object
import IHttpStatusCode from "../../InterfaceAdapters/Shared/IHttpStatusCode";

class StatusCode
{
    public static get HTTP_CONTINUE(): IHttpStatusCode { return {code: 100, statusCode: 'HTTP_CONTINUE', status: ''}; }
    public static get HTTP_SWITCHING_PROTOCOLS(): IHttpStatusCode { return {code: 101, statusCode: 'HTTP_SWITCHING_PROTOCOLS', status: '' }; }
    public static get HTTP_PROCESSING(): IHttpStatusCode { return {code: 102, statusCode: 'HTTP_PROCESSING', status: '' }; }            // RFC2518
    public static get HTTP_EARLY_HINTS(): IHttpStatusCode { return {code: 103, statusCode: 'HTTP_EARLY_HINTS', status: '' }; }           // RFC8297
    public static get HTTP_OK(): IHttpStatusCode { return {code: 200, statusCode: 'HTTP_OK', status: 'success' }; }
    public static get HTTP_CREATED(): IHttpStatusCode { return {code: 201, statusCode: 'HTTP_CREATED', status: 'success' }; }
    public static get HTTP_ACCEPTED(): IHttpStatusCode { return {code: 202, statusCode: 'HTTP_ACCEPTED', status: 'success' }; }
    public static get HTTP_NON_AUTHORITATIVE_INFORMATION(): IHttpStatusCode { return {code: 203, statusCode: 'HTTP_NON_AUTHORITATIVE_INFORMATION', status: 'success' }; }
    public static get HTTP_NO_CONTENT(): IHttpStatusCode { return {code: 204, statusCode: 'HTTP_NO_CONTENT', status: 'success' }; }
    public static get HTTP_RESET_CONTENT(): IHttpStatusCode { return {code: 205, statusCode: 'HTTP_RESET_CONTENT', status: 'success' }; }
    public static get HTTP_PARTIAL_CONTENT(): IHttpStatusCode { return {code: 206, statusCode: 'HTTP_PARTIAL_CONTENT', status: 'success' }; }
    public static get HTTP_MULTI_STATUS(): IHttpStatusCode { return {code: 207, statusCode: 'HTTP_MULTI_STATUS', status: 'success' }; }          // RFC4918
    public static get HTTP_ALREADY_REPORTED(): IHttpStatusCode { return {code: 208, statusCode: 'HTTP_ALREADY_REPORTED', status: 'success' }; }      // RFC5842
    public static get HTTP_IM_USED(): IHttpStatusCode { return {code: 226, statusCode: 'HTTP_IM_USED', status: 'success' }; }               // RFC3229
    public static get HTTP_MULTIPLE_CHOICES(): IHttpStatusCode { return {code: 300, statusCode: 'HTTP_MULTIPLE_CHOICES', status: '' }; }
    public static get HTTP_MOVED_PERMANENTLY(): IHttpStatusCode { return {code: 301, statusCode: 'HTTP_MOVED_PERMANENTLY', status: '' }; }
    public static get HTTP_FOUND(): IHttpStatusCode { return {code: 302, statusCode: 'HTTP_FOUND', status: '' }; }
    public static get HTTP_SEE_OTHER(): IHttpStatusCode { return {code: 303, statusCode: 'HTTP_SEE_OTHER', status: '' }; }
    public static get HTTP_NOT_MODIFIED(): IHttpStatusCode { return {code: 304, statusCode: 'HTTP_NOT_MODIFIED', status: '' }; }
    public static get HTTP_USE_PROXY(): IHttpStatusCode { return {code: 305, statusCode: 'HTTP_USE_PROXY', status: '' }; }
    public static get HTTP_RESERVED(): IHttpStatusCode { return {code: 306, statusCode: 'HTTP_RESERVED', status: '' }; }
    public static get HTTP_TEMPORARY_REDIRECT(): IHttpStatusCode { return {code: 307, statusCode: 'HTTP_TEMPORARY_REDIRECT', status: '' }; }
    public static get HTTP_PERMANENTLY_REDIRECT(): IHttpStatusCode { return {code: 308, statusCode: 'HTTP_PERMANENTLY_REDIRECT', status: '' }; }  // RFC7238
    public static get HTTP_BAD_REQUEST(): IHttpStatusCode { return {code: 400, statusCode: 'HTTP_BAD_REQUEST', status: 'error' }; }
    public static get HTTP_UNAUTHORIZED(): IHttpStatusCode { return {code: 401, statusCode: 'HTTP_UNAUTHORIZED', status: 'error' }; }
    public static get HTTP_PAYMENT_REQUIRED(): IHttpStatusCode { return {code: 402, statusCode: 'HTTP_PAYMENT_REQUIRED', status: 'error' }; }
    public static get HTTP_FORBIDDEN(): IHttpStatusCode { return {code: 403, statusCode: 'HTTP_FORBIDDEN', status: 'error' }; }
    public static get HTTP_NOT_FOUND(): IHttpStatusCode { return {code: 404, statusCode: 'HTTP_NOT_FOUND', status: 'error' }; }
    public static get HTTP_METHOD_NOT_ALLOWED(): IHttpStatusCode { return {code: 405, statusCode: 'HTTP_METHOD_NOT_ALLOWED', status: 'error' }; }
    public static get HTTP_NOT_ACCEPTABLE(): IHttpStatusCode { return {code: 406, statusCode: 'HTTP_NOT_ACCEPTABLE', status: 'error' }; }
    public static get HTTP_PROXY_AUTHENTICATION_REQUIRED(): IHttpStatusCode { return {code: 407, statusCode: 'HTTP_PROXY_AUTHENTICATION_REQUIRED', status: 'error' }; }
    public static get HTTP_REQUEST_TIMEOUT(): IHttpStatusCode { return {code: 408, statusCode: 'HTTP_REQUEST_TIMEOUT', status: 'error' }; }
    public static get HTTP_CONFLICT(): IHttpStatusCode { return {code: 409, statusCode: 'HTTP_CONFLICT', status: 'error' }; }
    public static get HTTP_GONE(): IHttpStatusCode { return {code: 410, statusCode: 'HTTP_GONE', status: 'error' }; }
    public static get HTTP_LENGTH_REQUIRED(): IHttpStatusCode { return {code: 411, statusCode: 'HTTP_LENGTH_REQUIRED', status: 'error' }; }
    public static get HTTP_PRECONDITION_FAILED(): IHttpStatusCode { return {code: 412, statusCode: 'HTTP_PRECONDITION_FAILED', status: 'error' }; }
    public static get HTTP_REQUEST_ENTITY_TOO_LARGE(): IHttpStatusCode { return {code: 413, statusCode: 'HTTP_REQUEST_ENTITY_TOO_LARGE', status: 'error' }; }
    public static get HTTP_REQUEST_URI_TOO_LONG(): IHttpStatusCode { return {code: 414, statusCode: 'HTTP_REQUEST_URI_TOO_LONG', status: 'error' }; }
    public static get HTTP_UNSUPPORTED_MEDIA_TYPE(): IHttpStatusCode { return {code: 415, statusCode: 'HTTP_UNSUPPORTED_MEDIA_TYPE', status: 'error' }; }
    public static get HTTP_REQUESTED_RANGE_NOT_SATISFIABLE(): IHttpStatusCode { return {code: 416, statusCode: 'HTTP_REQUESTED_RANGE_NOT_SATISFIABLE', status: 'error' }; }
    public static get HTTP_EXPECTATION_FAILED(): IHttpStatusCode { return {code: 417, statusCode: 'HTTP_EXPECTATION_FAILED', status: 'error' }; }
    public static get HTTP_I_AM_A_TEAPOT(): IHttpStatusCode { return {code: 418, statusCode: 'HTTP_I_AM_A_TEAPOT', status: 'error' }; }                                               // RFC2324
    public static get HTTP_MISDIRECTED_REQUEST(): IHttpStatusCode { return {code: 421, statusCode: 'HTTP_MISDIRECTED_REQUEST', status: 'error' }; }                                         // RFC7540
    public static get HTTP_UNPROCESSABLE_ENTITY(): IHttpStatusCode { return {code: 422, statusCode: 'HTTP_UNPROCESSABLE_ENTITY', status: 'error' }; }                                        // RFC4918
    public static get HTTP_LOCKED(): IHttpStatusCode { return {code: 423, statusCode: 'HTTP_LOCKED', status: 'error' }; }                                                      // RFC4918
    public static get HTTP_FAILED_DEPENDENCY(): IHttpStatusCode { return {code: 424, statusCode: 'HTTP_FAILED_DEPENDENCY', status: 'error' }; }                                           // RFC4918
    public static get HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL(): IHttpStatusCode { return {code: 425, statusCode: 'HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL', status: 'error' }; }   // RFC2817
    public static get HTTP_TOO_EARLY(): IHttpStatusCode { return {code: 425, statusCode: 'HTTP_TOO_EARLY', status: 'error' }; }                                                   // RFC-ietf-httpbis-replay-04
    public static get HTTP_UPGRADE_REQUIRED(): IHttpStatusCode { return {code: 426, statusCode: 'HTTP_UPGRADE_REQUIRED', status: 'error' }; }                                            // RFC2817
    public static get HTTP_PRECONDITION_REQUIRED(): IHttpStatusCode { return {code: 428, statusCode: 'HTTP_PRECONDITION_REQUIRED', status: 'error' }; }                                       // RFC6585
    public static get HTTP_TOO_MANY_REQUESTS(): IHttpStatusCode { return {code: 429, statusCode: 'HTTP_TOO_MANY_REQUESTS', status: 'error' }; }                                           // RFC6585
    public static get HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE(): IHttpStatusCode { return {code: 431, statusCode: 'HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE', status: 'error' }; }                             // RFC6585
    public static get HTTP_UNAVAILABLE_FOR_LEGAL_REASONS(): IHttpStatusCode { return {code: 451, statusCode: 'HTTP_UNAVAILABLE_FOR_LEGAL_REASONS', status: 'error' }; }
    public static get HTTP_INTERNAL_SERVER_ERROR(): IHttpStatusCode { return {code: 500, statusCode: 'HTTP_INTERNAL_SERVER_ERROR', status: 'error' }; }
    public static get HTTP_NOT_IMPLEMENTED(): IHttpStatusCode { return {code: 501, statusCode: 'HTTP_NOT_IMPLEMENTED', status: 'error' }; }
    public static get HTTP_BAD_GATEWAY(): IHttpStatusCode { return {code: 502, statusCode: 'HTTP_BAD_GATEWAY', status: 'error' }; }
    public static get HTTP_SERVICE_UNAVAILABLE(): IHttpStatusCode { return {code: 503, statusCode: 'HTTP_SERVICE_UNAVAILABLE', status: 'error' }; }
    public static get HTTP_GATEWAY_TIMEOUT(): IHttpStatusCode { return {code: 504, statusCode: 'HTTP_GATEWAY_TIMEOUT', status: 'error' }; }
    public static get HTTP_VERSION_NOT_SUPPORTED(): IHttpStatusCode { return {code: 505, statusCode: 'HTTP_VERSION_NOT_SUPPORTED', status: 'error' }; }
    public static get HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL(): IHttpStatusCode { return {code: 506, statusCode: 'HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL', status: 'error' }; }                        // RFC2295
    public static get HTTP_INSUFFICIENT_STORAGE(): IHttpStatusCode { return {code: 507, statusCode: 'HTTP_INSUFFICIENT_STORAGE', status: 'error' }; }                                        // RFC4918
    public static get HTTP_LOOP_DETECTED(): IHttpStatusCode { return {code: 508, statusCode: 'HTTP_LOOP_DETECTED', status: 'error' }; }                                               // RFC5842
    public static get HTTP_NOT_EXTENDED(): IHttpStatusCode { return {code: 510, statusCode: 'HTTP_NOT_EXTENDED', status: 'error' }; }                                                // RFC2774
    public static get HTTP_NETWORK_AUTHENTICATION_REQUIRED(): IHttpStatusCode { return {code: 511, statusCode: 'HTTP_NETWORK_AUTHENTICATION_REQUIRED', status: 'error' }; }                             // RFC6585
}

export default StatusCode;
