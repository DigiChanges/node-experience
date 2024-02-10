import NotificationRepPayload from '../Payloads/NotificationRepPayload';
import INotificationResponse from '../Entities/INotificationResponse';
import NotificationService from '../Services/NotificationService';

class CreateSubscriptionUseCase
{
    #notificationService = new NotificationService();

    async handle(payload: NotificationRepPayload): Promise<INotificationResponse>
    {
        return await this.#notificationService.createSubscription(payload);
    }
}

export default CreateSubscriptionUseCase;
