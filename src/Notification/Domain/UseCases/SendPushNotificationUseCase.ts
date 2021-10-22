import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import INotificationService from '../../InterfaceAdapters/INotificationService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class SendPushNotificationUseCase
{
    @containerFactory(SERVICES.INotificationService)
    private notificationService: INotificationService;

    async handle(payload: NotificationSendMessagePayload)
    {
        return this.notificationService.sendPushNotification(payload);
    }
}

export default SendPushNotificationUseCase;
