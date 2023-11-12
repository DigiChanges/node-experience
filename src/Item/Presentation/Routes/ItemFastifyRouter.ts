import { FastifyInstance } from 'fastify';
import ItemFastifyController from '../Controllers/ItemFastifyController';
import AuthorizeFastifyMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeFastifyMiddleware';
import Permissions from '../../../Config/Permissions';

const ItemFastifyRouter = async(fastify: FastifyInstance) =>
{
    fastify.post('/',  { preHandler: AuthorizeFastifyMiddleware(Permissions.ITEMS_SAVE) }, ItemFastifyController.save);
    fastify.get('/', { preHandler: AuthorizeFastifyMiddleware(Permissions.ITEMS_LIST) }, ItemFastifyController.list);
    fastify.get('/:id', { preHandler: AuthorizeFastifyMiddleware(Permissions.ITEMS_SHOW) }, ItemFastifyController.show);
    fastify.put('/:id', { preHandler: AuthorizeFastifyMiddleware(Permissions.ITEMS_UPDATE) }, ItemFastifyController.update);
    fastify.delete('/:id', { preHandler: AuthorizeFastifyMiddleware(Permissions.ITEMS_DELETE) }, ItemFastifyController.remove);
};

export default ItemFastifyRouter;
