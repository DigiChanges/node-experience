import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import NotificationService from '../Services/NotificationService';

class SendPushNotificationUseCase
{
    private notification_service = new NotificationService();

    async handle(payload: NotificationSendMessagePayload)
    {
        return this.notification_service.send_push_notification(payload);
    }
}

export default SendPushNotificationUseCase;
