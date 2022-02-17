import Koa from 'koa';
import Router from 'koa-router';
import { StatusCode } from '@digichanges/shared-experience';
import Responder from '../../../../App/Presentation/Shared/Koa/Responder';
import NotificationController from '../../Controller/NotificationController';
import NotificationSubscriptionRequest from '../../Requests/NotificationCreateSuscriptionRequest';
import NotificationSendMessageRequest from '../../Requests/NotificationSendMessageRequest';


const routerOpts: Router.IRouterOptions = {
    prefix: '/api/notifications'
};

const NotificationHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();
const controller = new NotificationController();

NotificationHandler.post('/subscription', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new NotificationSubscriptionRequest(ctx.request.body);

    const notification = await controller.uploadTestNotificationBase64(_request);

    void await responder.send(notification, ctx, StatusCode.HTTP_CREATED);
});

NotificationHandler.post('/message', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new NotificationSendMessageRequest(ctx.request.body);

    const notification = await controller.sendPushNotification(_request);

    void await responder.send(notification, ctx, StatusCode.HTTP_CREATED);
});

export default NotificationHandler;
