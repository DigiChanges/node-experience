import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import INotificationService from '../../InterfaceAdapters/INotificationService';

class CreateSubscriptionUseCase
{
    @containerFactory(SERVICES.INotificationService)
    private notification_service: INotificationService;

    async handle(payload: NotificationRepPayload)
    {
        return await this.notification_service.createSubscription(payload);
    }
}

export default CreateSubscriptionUseCase;
