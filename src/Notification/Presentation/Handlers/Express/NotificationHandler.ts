import { inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { httpPost, request, response, next, controller } from 'inversify-express-utils';
import { StatusCode } from '@digichanges/shared-experience';

import { TYPES } from '../../../../types';
import NotificationSubscriptionRequest from '../../Requests/NotificationCreateSuscriptionRequest';
import NotificationSendMessageRequest from '../../Requests/NotificationSendMessageRequest';
import Responder from '../../../../App/Presentation/Shared/Responder';
import NotificationController from '../../Controller/NotificationController';

@controller('/api/notifications')
class NotificationHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;
    private readonly controller: NotificationController;

    constructor()
    {
        this.controller = new NotificationController();
    }

    @httpPost('/subscription')
    public async uploadTestNotificationBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new NotificationSubscriptionRequest(req.body);

        const notification = this.controller.uploadTestNotificationBase64(_request);

        this.responder.send(notification, req, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/message')
    public async sendPushNotification(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new NotificationSendMessageRequest(req.body);

        const notification = this.controller.sendPushNotification(_request);

        this.responder.send(notification, req, res, StatusCode.HTTP_CREATED, null);
    }
}

export default NotificationHandler;
