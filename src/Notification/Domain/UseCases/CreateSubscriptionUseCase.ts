import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import INotificationService from '../../InterfaceAdapters/INotificationService';
import INotificationResponse from '../../InterfaceAdapters/INotificationResponse';

class CreateSubscriptionUseCase
{
    @containerFactory(SERVICES.INotificationService)
    private notificationService: INotificationService;

    async handle(payload: NotificationRepPayload): Promise<INotificationResponse>
    {
        return await this.notificationService.createSubscription(payload);
    }
}

export default CreateSubscriptionUseCase;
