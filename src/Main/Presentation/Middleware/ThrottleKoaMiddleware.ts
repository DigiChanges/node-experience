import { StatusCode } from '@digichanges/shared-experience';
import throttle from 'koa-ratelimit';
import MainConfig from '../../../Config/MainConfig';

const config = MainConfig.getInstance().getConfig().statusCode;

const meta: any = {
    ...StatusCode.HTTP_TOO_MANY_REQUESTS,
    message: 'Exceed 30 request per second',
    errors: null
};

const db = new Map(); // TODO: Replace to REDIS

// Blocking when exceed more than 30 request per second
const ThrottleKoaMiddleware = throttle({
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

export default ThrottleKoaMiddleware;
