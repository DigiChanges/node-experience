import throttle from 'express-rate-limit';
import {StatusCode} from '@digichanges/shared-experience';

const meta: any = {
    status: StatusCode.HTTP_TOO_MANY_REQUESTS.status,
    code: StatusCode.HTTP_TOO_MANY_REQUESTS.code,
    statusCode: StatusCode.HTTP_TOO_MANY_REQUESTS.statusCode,
    message: 'Exceed 1 request per second',
    errors: null
};

// Blocking when exceed more than 15 request per second
const Throttle = throttle({
    windowMs: 1000, // 1 second
    max: 15, // start blocking after 15 request
    message: meta
});

export default Throttle;