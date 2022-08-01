import NotificationRepPayload from '../../Domain/Payloads/NotificationRepPayload';
import NotificationSendMessagePayload from '../../Domain/Payloads/NotificationSendMessagePayload';
import ValidatorRequest from '../../../Shared/Presentation/Shared/ValidatorRequest';
import CreateSubscriptionUseCase from '../../Domain/UseCases/CreateSubscriptionUseCase';
import SendPushNotificationUseCase from '../../Domain/UseCases/SendPushNotificationUseCase';
import INotificationResponse from '../../Domain/Entities/INotificationResponse';

class NotificationController
{
    public async uploadTestNotificationBase64(request: NotificationRepPayload): Promise<INotificationResponse>
    {
        await ValidatorRequest.handle(request);

        const useCase = new CreateSubscriptionUseCase();
        return useCase.handle(request);
    }

    public async sendPushNotification(request: NotificationSendMessagePayload): Promise<INotificationResponse>
    {
        await ValidatorRequest.handle(request);

        const useCase = new SendPushNotificationUseCase();
        return useCase.handle(request);
    }
}

export default NotificationController;
