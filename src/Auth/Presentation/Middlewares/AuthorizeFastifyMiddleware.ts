import { FastifyReply, FastifyRequest } from 'fastify';

import { MainConfig } from '../../../Config/MainConfig';
import TokenNotFoundHttpException from '../Exceptions/TokenNotFoundHttpException';
import IAuthorizeService from '../../Domain/Services/IAuthorizeService';
import { StatusCode } from '../../../Main/Presentation/Application/StatusCode';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';

const AuthorizeFastifyMiddleware = (...handlerPermissions: string[]) =>
{
    return async(request: FastifyRequest, reply: FastifyReply) =>
    {
        const config = MainConfig.getEnv();

        if (config.AUTH_AUTHORIZATION)
        {
            try
            {
                const bearerToken = request.headers.authorization;

                if (!bearerToken)
                {
                    throw new TokenNotFoundHttpException();
                }

                const authorizeService = DependencyInjector.inject<IAuthorizeService>(IAuthorizeService);

                const token = bearerToken.split(' ')[1];
                const decode = authorizeService.decodeToken(token);
                await authorizeService.authorize(decode.sub, handlerPermissions[0]);

                request['user'] = await authorizeService.getAuthUser(token);
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
