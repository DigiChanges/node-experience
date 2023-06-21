import Koa from 'koa';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import NotificationSubscriptionRequest from '../Requests/NotificationCreateSuscriptionRequest';
import NotificationSendMessageRequest from '../Requests/NotificationSendMessageRequest';
import MainConfig from '../../../Config/MainConfig';
import CreateSubscriptionUseCase from '../../Domain/UseCases/CreateSubscriptionUseCase';
import SendPushNotificationUseCase from '../../Domain/UseCases/SendPushNotificationUseCase';

class NotificationKoaController
{
    private static responder: KoaResponder = new KoaResponder();
    private static config = MainConfig.getInstance().getConfig().statusCode;

    static async handleSubscription(ctx: Koa.ParameterizedContext & any)
    {
        const _request = new NotificationSubscriptionRequest(ctx.request.body);

        const useCase = new CreateSubscriptionUseCase();
        const notification = useCase.handle(_request);

        void await NotificationKoaController.responder.send(notification, ctx, NotificationKoaController.config['HTTP_CREATED']);
    }

    static async handleMessage(ctx: Koa.ParameterizedContext & any)
    {
        const _request = new NotificationSendMessageRequest(ctx.request.body);

        const useCase = new SendPushNotificationUseCase();
        const notification = useCase.handle(_request);

        void await NotificationKoaController.responder.send(notification, ctx, NotificationKoaController.config['HTTP_CREATED']);
    }
}

export default NotificationKoaController;
