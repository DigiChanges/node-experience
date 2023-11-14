import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCode } from '@digichanges/shared-experience';

import MainConfig from '../../../Config/MainConfig';
import { SERVICES } from '../../../Config/Injects';
import container from '../../../register';
import AuthorizeSupabaseService from '../../Domain/Services/AuthorizeSupabaseService';
// import AuthHelperService from '../../Domain/Services/AuthHelperService';

const AuthorizeFastifyMiddleware = (...handlerPermissions: string[]) =>
{
    return async(request: FastifyRequest, reply: FastifyReply) =>
    {
        const bearerToken = request.headers.authorization;
        const authorizeService: AuthorizeSupabaseService = container.resolve<AuthorizeSupabaseService>(SERVICES.AuthorizeService);

        const config = MainConfig.getInstance().getConfig();
        const { authorization: hasActiveAuthorization } = config.auth;

        if (hasActiveAuthorization)
        {
            try
            {
                // const authHelperService = new AuthHelperService();
                // token = authHelperService.getToken(bearerToken, 'accessToken');
                // await authorizeService.authorize(token, handlerPermissions);

                // request.accessToken = token;
                // request.authUser = await authorizeService.getAuthUser({ token, hasActiveAuthorization });
            }
            catch (error)
            {
                await reply.status(StatusCode.HTTP_UNAUTHORIZED.code).send({ error: 'Unauthorized' });
                return;
            }
        }
    };
};


export default AuthorizeFastifyMiddleware;
