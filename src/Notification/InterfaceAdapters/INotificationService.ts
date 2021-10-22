import PushNotification from '../Domain/Entities/PushNotification';
import NotificationRepPayload from './Payloads/NotificationRepPayload';
import NotificationSendMessagePayload from './Payloads/NotificationSendMessagePayload';
import INotificationResponse from './INotificationResponse';

interface INotificationService
{
    execute(pushNotification: PushNotification, payload: NotificationRepPayload, message: string, name: string): Promise<INotificationResponse>;
    createSubscription(payload: NotificationRepPayload): Promise<INotificationResponse>;
    sendPushNotification(payload: NotificationSendMessagePayload): Promise<INotificationResponse>;
}

export default INotificationService;
