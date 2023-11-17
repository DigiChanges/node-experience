import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import throttle from '@fastify/throttle';

import IndexFastifyRouter from '../Routers/IndexFastifyRouter';
import ItemFastifyRouter from '../../../Item/Presentation/Routes/ItemFastifyRouter';
import NotificationFastifyHandler from '../../../Notification/Presentation/Handlers/NotificationFastifyHandler';

import IExtendAppConfig from './IExtendAppConfig';
import { AppFastify } from './AppFastify';
import { ErrorFastifyHandler } from '../Middleware/ErrorFastifyHandler';

const FastifyBootstrapping = async(config: IExtendAppConfig) =>
{
    const app = new AppFastify(config);

    await app.addMiddleware(cors, {
        origin: (origin: string, cb: (err: Error, valid: boolean) => void) =>
        {
            const validDomains = process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [process.env.URL_WEB];

            if (validDomains.includes(origin))
            {
                cb(null, true);
                return;
            }

            cb(new Error('Sorry,request not allowed, there is a problem with CORS,'), false);
            return;
        }
    });

    await app.addMiddleware(helmet);
    await app.addMiddleware(compress);

    // Error handler must be a plugin in Fastify
    await app.setErrorHandler(ErrorFastifyHandler);

    // Throttle middleware
    await app.addMiddleware(throttle);

    // Register your routes as plugins
    await app.addRouter(IndexFastifyRouter, { prefix: '/' });
    await app.addRouter(ItemFastifyRouter, { prefix: '/api/items' });
    await app.addRouter(NotificationFastifyHandler, { prefix: '/api/notifications' });

    return app;
};

export default FastifyBootstrapping;
