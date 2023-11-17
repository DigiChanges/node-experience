import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCode } from '@digichanges/shared-experience';

import FastifyResponder from '../../../Main/Presentation/Utils/FastifyResponder';
import NotificationSubscriptionRequest from '../Requests/NotificationCreateSuscriptionRequest';
import NotificationSendMessageRequest from '../Requests/NotificationSendMessageRequest';
import CreateSubscriptionUseCase from '../../Domain/UseCases/CreateSubscriptionUseCase';
import SendPushNotificationUseCase from '../../Domain/UseCases/SendPushNotificationUseCase';

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
}

export default NotificationFastifyController;
