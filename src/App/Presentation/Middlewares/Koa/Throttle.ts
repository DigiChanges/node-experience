import throttle from 'koa-ratelimit';
import { StatusCode } from '@digichanges/shared-experience';

const meta: any = {
    status: StatusCode.HTTP_TOO_MANY_REQUESTS.status,
    code: StatusCode.HTTP_TOO_MANY_REQUESTS.code,
    statusCode: StatusCode.HTTP_TOO_MANY_REQUESTS.statusCode,
    message: 'Exceed 30 request per second',
    errors: null
};

const db = new Map(); // TODO: Replace to REDIS

// Blocking when exceed more than 15 request per second
const Throttle = throttle({
    driver: 'memory',
    db,
    duration: 1000,
    errorMessage: meta,
    headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total'
    },
    max: 30,
    disableHeader: true
});

export default Throttle;
