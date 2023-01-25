import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import NotificationController from '../Controller/NotificationController';
import NotificationSubscriptionRequest from '../Requests/NotificationCreateSuscriptionRequest';
import NotificationSendMessageRequest from '../Requests/NotificationSendMessageRequest';
import MainConfig from '../../../Config/MainConfig';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/notifications'
};

const NotificationKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new NotificationController();
const config = MainConfig.getInstance().getConfig().statusCode;

NotificationKoaHandler.post('/subscription', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new NotificationSubscriptionRequest(ctx.request.body);

    const notification = await controller.uploadTestNotificationBase64(_request);

    void await responder.send(notification, ctx, config['HTTP_CREATED']);
});

NotificationKoaHandler.post('/message', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new NotificationSendMessageRequest(ctx.request.body);

    const notification = await controller.sendPushNotification(_request);

    void await responder.send(notification, ctx, config['HTTP_CREATED']);
});

export default NotificationKoaHandler;
