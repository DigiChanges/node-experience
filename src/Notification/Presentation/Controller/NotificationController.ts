import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';
import CreateSubscriptionUseCase from '../../Domain/UseCases/CreateSubscriptionUseCase';
import SendPushNotificationUseCase from '../../Domain/UseCases/SendPushNotificationUseCase';

class NotificationController
{
    public async uploadTestNotificationBase64(request: NotificationRepPayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new CreateSubscriptionUseCase();
        return useCase.handle(request);
    }

    public async sendPushNotification(request: NotificationSendMessagePayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new SendPushNotificationUseCase();
        return useCase.handle(request);
    }
}

export default NotificationController;
