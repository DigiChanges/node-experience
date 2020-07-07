
// TODO: Modified result on an concret/abstract object
class StatusCode
{
    public static get HTTP_CONTINUE(): any { return {code: 100, statusCode: 'HTTP_CONTINUE', status: ''}; }
    public static get HTTP_SWITCHING_PROTOCOLS(): any { return {code: 101, statusCode: 'HTTP_SWITCHING_PROTOCOLS', status: '' }; }
    public static get HTTP_PROCESSING(): any { return {code: 102, statusCode: 'HTTP_PROCESSING', status: '' }; }            // RFC2518
    public static get HTTP_EARLY_HINTS(): any { return {code: 103, statusCode: 'HTTP_EARLY_HINTS', status: '' }; }           // RFC8297
    public static get HTTP_OK(): any { return {code: 200, statusCode: 'HTTP_OK', status: 'success' }; }
    public static get HTTP_CREATED(): any { return {code: 201, statusCode: 'HTTP_CREATED', status: 'success' }; }
    public static get HTTP_ACCEPTED(): any { return {code: 202, statusCode: 'HTTP_ACCEPTED', status: 'success' }; }
    public static get HTTP_NON_AUTHORITATIVE_INFORMATION(): any { return {code: 203, statusCode: 'HTTP_NON_AUTHORITATIVE_INFORMATION', status: 'success' }; }
    public static get HTTP_NO_CONTENT(): any { return {code: 204, statusCode: 'HTTP_NO_CONTENT', status: 'success' }; }
    public static get HTTP_RESET_CONTENT(): any { return {code: 205, statusCode: 'HTTP_RESET_CONTENT', status: 'success' }; }
    public static get HTTP_PARTIAL_CONTENT(): any { return {code: 206, statusCode: 'HTTP_PARTIAL_CONTENT', status: 'success' }; }
    public static get HTTP_MULTI_STATUS(): any { return {code: 207, statusCode: 'HTTP_MULTI_STATUS', status: 'success' }; }          // RFC4918
    public static get HTTP_ALREADY_REPORTED(): any { return {code: 208, statusCode: 'HTTP_ALREADY_REPORTED', status: 'success' }; }      // RFC5842
    public static get HTTP_IM_USED(): any { return {code: 226, statusCode: 'HTTP_IM_USED', status: 'success' }; }               // RFC3229
    public static get HTTP_MULTIPLE_CHOICES(): any { return {code: 300, statusCode: 'HTTP_MULTIPLE_CHOICES', status: '' }; }
    public static get HTTP_MOVED_PERMANENTLY(): any { return {code: 301, statusCode: 'HTTP_MOVED_PERMANENTLY', status: '' }; }
    public static get HTTP_FOUND(): any { return {code: 302, statusCode: 'HTTP_FOUND', status: '' }; }
    public static get HTTP_SEE_OTHER(): any { return {code: 303, statusCode: 'HTTP_SEE_OTHER', status: '' }; }
    public static get HTTP_NOT_MODIFIED(): any { return {code: 304, statusCode: 'HTTP_NOT_MODIFIED', status: '' }; }
    public static get HTTP_USE_PROXY(): any { return {code: 305, statusCode: 'HTTP_USE_PROXY', status: '' }; }
    public static get HTTP_RESERVED(): any { return {code: 306, statusCode: 'HTTP_RESERVED', status: '' }; }
    public static get HTTP_TEMPORARY_REDIRECT(): any { return {code: 307, statusCode: 'HTTP_TEMPORARY_REDIRECT', status: '' }; }
    public static get HTTP_PERMANENTLY_REDIRECT(): any { return {code: 308, statusCode: 'HTTP_PERMANENTLY_REDIRECT', status: '' }; }  // RFC7238
    public static get HTTP_BAD_REQUEST(): any { return {code: 400, statusCode: 'HTTP_BAD_REQUEST', status: 'error' }; }
    public static get HTTP_UNAUTHORIZED(): any { return {code: 401, statusCode: 'HTTP_UNAUTHORIZED', status: 'error' }; }
    public static get HTTP_PAYMENT_REQUIRED(): any { return {code: 402, statusCode: 'HTTP_PAYMENT_REQUIRED', status: 'error' }; }
    public static get HTTP_FORBIDDEN(): any { return {code: 403, statusCode: 'HTTP_FORBIDDEN', status: 'error' }; }
    public static get HTTP_NOT_FOUND(): any { return {code: 404, statusCode: 'HTTP_NOT_FOUND', status: 'error' }; }
    public static get HTTP_METHOD_NOT_ALLOWED(): any { return {code: 405, statusCode: 'HTTP_METHOD_NOT_ALLOWED', status: 'error' }; }
    public static get HTTP_NOT_ACCEPTABLE(): any { return {code: 406, statusCode: 'HTTP_NOT_ACCEPTABLE', status: 'error' }; }
    public static get HTTP_PROXY_AUTHENTICATION_REQUIRED(): any { return {code: 407, statusCode: 'HTTP_PROXY_AUTHENTICATION_REQUIRED', status: 'error' }; }
    public static get HTTP_REQUEST_TIMEOUT(): any { return {code: 408, statusCode: 'HTTP_REQUEST_TIMEOUT', status: 'error' }; }
    public static get HTTP_CONFLICT(): any { return {code: 409, statusCode: 'HTTP_CONFLICT', status: 'error' }; }
    public static get HTTP_GONE(): any { return {code: 410, statusCode: 'HTTP_GONE', status: 'error' }; }
    public static get HTTP_LENGTH_REQUIRED(): any { return {code: 411, statusCode: 'HTTP_LENGTH_REQUIRED', status: 'error' }; }
    public static get HTTP_PRECONDITION_FAILED(): any { return {code: 412, statusCode: 'HTTP_PRECONDITION_FAILED', status: 'error' }; }
    public static get HTTP_REQUEST_ENTITY_TOO_LARGE(): any { return {code: 413, statusCode: 'HTTP_REQUEST_ENTITY_TOO_LARGE', status: 'error' }; }
    public static get HTTP_REQUEST_URI_TOO_LONG(): any { return {code: 414, statusCode: 'HTTP_REQUEST_URI_TOO_LONG', status: 'error' }; }
    public static get HTTP_UNSUPPORTED_MEDIA_TYPE(): any { return {code: 415, statusCode: 'HTTP_UNSUPPORTED_MEDIA_TYPE', status: 'error' }; }
    public static get HTTP_REQUESTED_RANGE_NOT_SATISFIABLE(): any { return {code: 416, statusCode: 'HTTP_REQUESTED_RANGE_NOT_SATISFIABLE', status: 'error' }; }
    public static get HTTP_EXPECTATION_FAILED(): any { return {code: 417, statusCode: 'HTTP_EXPECTATION_FAILED', status: 'error' }; }
    public static get HTTP_I_AM_A_TEAPOT(): any { return {code: 418, statusCode: 'HTTP_I_AM_A_TEAPOT', status: 'error' }; }                                               // RFC2324
    public static get HTTP_MISDIRECTED_REQUEST(): any { return {code: 421, statusCode: 'HTTP_MISDIRECTED_REQUEST', status: 'error' }; }                                         // RFC7540
    public static get HTTP_UNPROCESSABLE_ENTITY(): any { return {code: 422, statusCode: 'HTTP_UNPROCESSABLE_ENTITY', status: 'error' }; }                                        // RFC4918
    public static get HTTP_LOCKED(): any { return {code: 423, statusCode: 'HTTP_LOCKED', status: 'error' }; }                                                      // RFC4918
    public static get HTTP_FAILED_DEPENDENCY(): any { return {code: 424, statusCode: 'HTTP_FAILED_DEPENDENCY', status: 'error' }; }                                           // RFC4918
    public static get HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL(): any { return {code: 425, statusCode: 'HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL', status: 'error' }; }   // RFC2817
    public static get HTTP_TOO_EARLY(): any { return {code: 425, statusCode: 'HTTP_TOO_EARLY', status: 'error' }; }                                                   // RFC-ietf-httpbis-replay-04
    public static get HTTP_UPGRADE_REQUIRED(): any { return {code: 426, statusCode: 'HTTP_UPGRADE_REQUIRED', status: 'error' }; }                                            // RFC2817
    public static get HTTP_PRECONDITION_REQUIRED(): any { return {code: 428, statusCode: 'HTTP_PRECONDITION_REQUIRED', status: 'error' }; }                                       // RFC6585
    public static get HTTP_TOO_MANY_REQUESTS(): any { return {code: 429, statusCode: 'HTTP_TOO_MANY_REQUESTS', status: 'error' }; }                                           // RFC6585
    public static get HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE(): any { return {code: 431, statusCode: 'HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE', status: 'error' }; }                             // RFC6585
    public static get HTTP_UNAVAILABLE_FOR_LEGAL_REASONS(): any { return {code: 451, statusCode: 'HTTP_UNAVAILABLE_FOR_LEGAL_REASONS', status: 'error' }; }
    public static get HTTP_INTERNAL_SERVER_ERROR(): any { return {code: 500, statusCode: 'HTTP_INTERNAL_SERVER_ERROR', status: 'error' }; }
    public static get HTTP_NOT_IMPLEMENTED(): any { return {code: 501, statusCode: 'HTTP_NOT_IMPLEMENTED', status: 'error' }; }
    public static get HTTP_BAD_GATEWAY(): any { return {code: 502, statusCode: 'HTTP_BAD_GATEWAY', status: 'error' }; }
    public static get HTTP_SERVICE_UNAVAILABLE(): any { return {code: 503, statusCode: 'HTTP_SERVICE_UNAVAILABLE', status: 'error' }; }
    public static get HTTP_GATEWAY_TIMEOUT(): any { return {code: 504, statusCode: 'HTTP_GATEWAY_TIMEOUT', status: 'error' }; }
    public static get HTTP_VERSION_NOT_SUPPORTED(): any { return {code: 505, statusCode: 'HTTP_VERSION_NOT_SUPPORTED', status: 'error' }; }
    public static get HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL(): any { return {code: 506, statusCode: 'HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL', status: 'error' }; }                        // RFC2295
    public static get HTTP_INSUFFICIENT_STORAGE(): any { return {code: 507, statusCode: 'HTTP_INSUFFICIENT_STORAGE', status: 'error' }; }                                        // RFC4918
    public static get HTTP_LOOP_DETECTED(): any { return {code: 508, statusCode: 'HTTP_LOOP_DETECTED', status: 'error' }; }                                               // RFC5842
    public static get HTTP_NOT_EXTENDED(): any { return {code: 510, statusCode: 'HTTP_NOT_EXTENDED', status: 'error' }; }                                                // RFC2774
    public static get HTTP_NETWORK_AUTHENTICATION_REQUIRED(): any { return {code: 511, statusCode: 'HTTP_NETWORK_AUTHENTICATION_REQUIRED', status: 'error' }; }                             // RFC6585
}

export default StatusCode;