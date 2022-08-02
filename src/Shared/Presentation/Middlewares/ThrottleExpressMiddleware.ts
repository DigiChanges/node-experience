import throttle from 'express-rate-limit';
import StatusCode from '../../Application/StatusCode';

const meta: any = {
    message: 'Exceed 30 request per second',
    status: StatusCode.HTTP_TOO_MANY_REQUESTS.statusCode,
    statusCode: StatusCode.HTTP_TOO_MANY_REQUESTS.statusCode,
    errors: null
};

// Blocking when exceed more than 15 request per second
const ThrottleExpressMiddleware = throttle({
    windowMs: 1000, // 1 second
    max: 30, // start blocking after 30 request
    message: meta
});

export default ThrottleExpressMiddleware;
