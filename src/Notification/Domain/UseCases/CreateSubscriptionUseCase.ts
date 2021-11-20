import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import INotificationResponse from '../../InterfaceAdapters/INotificationResponse';
import NotificationService from '../Services/NotificationService';

class CreateSubscriptionUseCase
{
    private notificationService = new NotificationService();

    async handle(payload: NotificationRepPayload): Promise<INotificationResponse>
    {
        return await this.notificationService.createSubscription(payload);
    }
}

export default CreateSubscriptionUseCase;
