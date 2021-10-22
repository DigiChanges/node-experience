import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import INotificationService from '../../InterfaceAdapters/INotificationService';

class CreateSubscriptionUseCase
{
    @containerFactory(SERVICES.INotificationService)
    private notificationService: INotificationService;

    async handle(payload: NotificationRepPayload)
    {
        return await this.notificationService.createSubscription(payload);
    }
}

export default CreateSubscriptionUseCase;
