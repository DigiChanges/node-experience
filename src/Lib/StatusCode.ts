
class StatusCode
{
    public static get HTTP_CONTINUE():number { return 100; }
    public static get HTTP_SWITCHING_PROTOCOLS():number { return 101; }
    public static get HTTP_PROCESSING():number { return 102; }            // RFC2518
    public static get HTTP_EARLY_HINTS():number { return 103; }           // RFC8297
    public static get HTTP_OK():number { return 200; }
    public static get HTTP_CREATED():number { return 201; }
    public static get HTTP_ACCEPTED():number { return 202; }
    public static get HTTP_NON_AUTHORITATIVE_INFORMATION():number { return 203; }
    public static get HTTP_NO_CONTENT():number { return 204; }
    public static get HTTP_RESET_CONTENT():number { return 205; }
    public static get HTTP_PARTIAL_CONTENT():number { return 206; }
    public static get HTTP_MULTI_STATUS():number { return 207; }          // RFC4918
    public static get HTTP_ALREADY_REPORTED():number { return 208; }      // RFC5842
    public static get HTTP_IM_USED():number { return 226; }               // RFC3229
    public static get HTTP_MULTIPLE_CHOICES():number { return 300; }
    public static get HTTP_MOVED_PERMANENTLY():number { return 301; }
    public static get HTTP_FOUND():number { return 302; }
    public static get HTTP_SEE_OTHER():number { return 303; }
    public static get HTTP_NOT_MODIFIED():number { return 304; }
    public static get HTTP_USE_PROXY():number { return 305; }
    public static get HTTP_RESERVED():number { return 306; }
    public static get HTTP_TEMPORARY_REDIRECT():number { return 307; }
    public static get HTTP_PERMANENTLY_REDIRECT():number { return 308; }  // RFC7238
    public static get HTTP_BAD_REQUEST():number { return 400; }
    public static get HTTP_UNAUTHORIZED():number { return 401; }
    public static get HTTP_PAYMENT_REQUIRED():number { return 402; }
    public static get HTTP_FORBIDDEN():number { return 403; }
    public static get HTTP_NOT_FOUND():number { return 404; }
    public static get HTTP_METHOD_NOT_ALLOWED():number { return 405; }
    public static get HTTP_NOT_ACCEPTABLE():number { return 406; }
    public static get HTTP_PROXY_AUTHENTICATION_REQUIRED():number { return 407; }
    public static get HTTP_REQUEST_TIMEOUT():number { return 408; }
    public static get HTTP_CONFLICT():number { return 409; }
    public static get HTTP_GONE():number { return 410; }
    public static get HTTP_LENGTH_REQUIRED():number { return 411; }
    public static get HTTP_PRECONDITION_FAILED():number { return 412; }
    public static get HTTP_REQUEST_ENTITY_TOO_LARGE():number { return 413; }
    public static get HTTP_REQUEST_URI_TOO_LONG():number { return 414; }
    public static get HTTP_UNSUPPORTED_MEDIA_TYPE():number { return 415; }
    public static get HTTP_REQUESTED_RANGE_NOT_SATISFIABLE():number { return 416; }
    public static get HTTP_EXPECTATION_FAILED():number { return 417; }
    public static get HTTP_I_AM_A_TEAPOT():number { return 418; }                                               // RFC2324
    public static get HTTP_MISDIRECTED_REQUEST():number { return 421; }                                         // RFC7540
    public static get HTTP_UNPROCESSABLE_ENTITY():number { return 422; }                                        // RFC4918
    public static get HTTP_LOCKED():number { return 423; }                                                      // RFC4918
    public static get HTTP_FAILED_DEPENDENCY():number { return 424; }                                           // RFC4918
    public static get HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL():number { return 425; }   // RFC2817
    public static get HTTP_TOO_EARLY():number { return 425; }                                                   // RFC-ietf-httpbis-replay-04
    public static get HTTP_UPGRADE_REQUIRED():number { return 426; }                                            // RFC2817
    public static get HTTP_PRECONDITION_REQUIRED():number { return 428; }                                       // RFC6585
    public static get HTTP_TOO_MANY_REQUESTS():number { return 429; }                                           // RFC6585
    public static get HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE():number { return 431; }                             // RFC6585
    public static get HTTP_UNAVAILABLE_FOR_LEGAL_REASONS():number { return 451; }
    public static get HTTP_INTERNAL_SERVER_ERROR():number { return 500; }
    public static get HTTP_NOT_IMPLEMENTED():number { return 501; }
    public static get HTTP_BAD_GATEWAY():number { return 502; }
    public static get HTTP_SERVICE_UNAVAILABLE():number { return 503; }
    public static get HTTP_GATEWAY_TIMEOUT():number { return 504; }
    public static get HTTP_VERSION_NOT_SUPPORTED():number { return 505; }
    public static get HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL():number { return 506; }                        // RFC2295
    public static get HTTP_INSUFFICIENT_STORAGE():number { return 507; }                                        // RFC4918
    public static get HTTP_LOOP_DETECTED():number { return 508; }                                               // RFC5842
    public static get HTTP_NOT_EXTENDED():number { return 510; }                                                // RFC2774
    public static get HTTP_NETWORK_AUTHENTICATION_REQUIRED():number { return 511; }                             // RFC6585
}

export default StatusCode;