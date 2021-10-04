import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import NotificationService from '../Services/NotificationService';

class CreateSubscriptionUseCase
{
    private notificationService = new NotificationService();
    async handle(payload: NotificationRepPayload)
    {
        return await this.notificationService.createSubscription(payload);
    }
}

export default CreateSubscriptionUseCase;
