import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import NotificationService from '../Services/NotificationService';

class SendPushNotificationUseCase
{
    private notificationService = new NotificationService();

    async handle(payload: NotificationSendMessagePayload)
    {
        return this.notificationService.sendPushNotification(payload);
    }
}

export default SendPushNotificationUseCase;
