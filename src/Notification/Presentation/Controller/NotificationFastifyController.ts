import { FastifyReply, FastifyRequest } from 'fastify';

import FastifyResponder from '../../../Main/Presentation/Utils/FastifyResponder';
import NotificationSubscriptionRequest from '../Requests/NotificationCreateSuscriptionRequest';
import NotificationSendMessageRequest from '../Requests/NotificationSendMessageRequest';
import CreateSubscriptionUseCase from '../../Domain/UseCases/CreateSubscriptionUseCase';
import SendPushNotificationUseCase from '../../Domain/UseCases/SendPushNotificationUseCase';
import SendMessageBrokerUseCase from '../../Domain/UseCases/SendMessageBrokerUseCase';
import { StatusCode } from '../../../Main/Presentation/Application/StatusCode';

class NotificationFastifyController
{
    private static responder: FastifyResponder = new FastifyResponder();

    static async handleSubscription(request: FastifyRequest, reply: FastifyReply)
    {
        const _request = new NotificationSubscriptionRequest(request.body);

        const useCase = new CreateSubscriptionUseCase();
        const notification = await useCase.handle(_request);

        await NotificationFastifyController.responder.send(notification, reply, StatusCode.HTTP_CREATED);
    }

    static async handleMessage(request: FastifyRequest, reply: FastifyReply)
    {
        const _request = new NotificationSendMessageRequest(request.body);

        const useCase = new SendPushNotificationUseCase();
        const notification = await useCase.handle(_request);

        await NotificationFastifyController.responder.send(notification, reply, StatusCode.HTTP_CREATED);
    }

    static async sendMessageBroker(request: FastifyRequest, reply: FastifyReply)
    {
        const useCase = new SendMessageBrokerUseCase();
        await useCase.handle();

        await NotificationFastifyController.responder.send({ message: 'Message sent' }, reply, StatusCode.HTTP_OK);
    }
}

export default NotificationFastifyController;
