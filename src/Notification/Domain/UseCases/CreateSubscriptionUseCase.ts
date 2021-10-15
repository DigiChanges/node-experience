import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import NotificationService from '../Services/NotificationService';

class CreateSubscriptionUseCase
{
    private notification_service = new NotificationService();
    async handle(payload: NotificationRepPayload)
    {
        return await this.notification_service.createSubscription(payload);
    }
}

export default CreateSubscriptionUseCase;
