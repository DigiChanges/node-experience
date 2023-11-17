import { FastifyInstance } from 'fastify';
import AuthorizeFastifyMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeFastifyMiddleware';
import Permissions from '../../../Config/Permissions';
import AuthFastifyController from '../Controllers/AuthFastifyController';

const AuthFastifyRouter = async(fastify: FastifyInstance) =>
{
    fastify.get('/permissions', AuthFastifyController.getPermissions);
    fastify.post('/sync-roles-permissions', { preHandler: AuthorizeFastifyMiddleware(Permissions.AUTH_SYNC_PERMISSIONS) }, AuthFastifyController.syncRolesPermissions);
};

export default AuthFastifyRouter;
