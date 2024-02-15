import { FastifyInstance } from 'fastify';
import NotificationFastifyController from '../Controller/NotificationFastifyController';

const NotificationFastifyHandler = async(fastify: FastifyInstance) =>
{
    fastify.post('/subscription', NotificationFastifyController.handleSubscription);
    fastify.post('/message', NotificationFastifyController.handleMessage);
    fastify.get('/message_broker', NotificationFastifyController.sendMessageBroker);
};

export default NotificationFastifyHandler;
