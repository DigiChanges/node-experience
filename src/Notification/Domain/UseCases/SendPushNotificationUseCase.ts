import NotificationSendMessagePayload from '../Payloads/NotificationSendMessagePayload';
import NotificationService from '../Services/NotificationService';

class SendPushNotificationUseCase
{
    #notificationService = new NotificationService();

    async handle(payload: NotificationSendMessagePayload)
    {
        return this.#notificationService.sendPushNotification(payload);
    }
}

export default SendPushNotificationUseCase;
