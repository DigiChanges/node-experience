import {inject} from 'inversify';
import {NextFunction, Request, Response} from 'express';
import {httpPost, request, response, next, controller} from 'inversify-express-utils';
import {StatusCode} from '@digichanges/shared-experience';

import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';
import CreateSubscriptionUseCase from '../../Domain/UseCases/CreateSubscriptionUseCase';
import SendPushNotificationUseCase from '../../Domain/UseCases/SendPushNotificationUseCase';
import {TYPES} from '../../../types';
import NotificationSubscriptionRequest from '../Requests/NotificationCreateSuscriptionRequest';
import NotificationSendMessageRequest from '../Requests/NotificationSendMessageRequest';
import Responder from '../../../App/Presentation/Shared/Responder';

@controller('/api/notifications')
class NotificationHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/subscription')
    public async uploadTestNotificationBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new NotificationSubscriptionRequest(req);
        await ValidatorRequest.handle(_request);

        const createSubscriptionUseCase = new CreateSubscriptionUseCase();
        const notification = createSubscriptionUseCase.handle(_request);

        this.responder.send(notification, req, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/message')
    public async sendPushNotification(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new NotificationSendMessageRequest(req);
        await ValidatorRequest.handle(_request);

        const sendPushNotificationUseCase = new SendPushNotificationUseCase();
        const notification = sendPushNotificationUseCase.handle(_request);

        this.responder.send(notification, req, res, StatusCode.HTTP_CREATED, null);
    }
}

export default NotificationHandler;
