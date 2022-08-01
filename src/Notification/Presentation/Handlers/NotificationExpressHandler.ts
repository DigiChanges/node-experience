import { NextFunction, Request, Response } from 'express';
import { httpPost, request, response, next, controller } from 'inversify-express-utils';

import NotificationSubscriptionRequest from '../Requests/NotificationCreateSuscriptionRequest';
import NotificationSendMessageRequest from '../Requests/NotificationSendMessageRequest';
import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';
import NotificationController from '../Controller/NotificationController';
import StatusCode from '../../../Shared/Application/StatusCode';

@controller('/api/notifications')
class NotificationExpressHandler
{
    private responder: ExpressResponder;
    private readonly controller: NotificationController;

    constructor()
    {
        this.responder = new ExpressResponder();
        this.controller = new NotificationController();
    }

    @httpPost('/subscription')
    public async uploadTestNotificationBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new NotificationSubscriptionRequest(req.body);

        const notification = this.controller.uploadTestNotificationBase64(_request);

        void await this.responder.send(notification, req, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/message')
    public async sendPushNotification(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new NotificationSendMessageRequest(req.body);

        const notification = this.controller.sendPushNotification(_request);

        void await this.responder.send(notification, req, res, StatusCode.HTTP_CREATED, null);
    }
}

export default NotificationExpressHandler;
