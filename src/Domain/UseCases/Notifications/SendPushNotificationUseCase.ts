import PushNotification from '../../../Infrastructure/Entities/PushNotification';
import EventHandler from '../../../Infrastructure/Events/EventHandler';
import SendMessageEvent from '../../../Infrastructure/Events/SendMessageEvent';
import NotificationSendMessageRequest from '../../../Presentation/Requests/Handler/Notification/NotificationSendMessageRequest';

class SendPushNotificationUseCase
{
    handle(payload: NotificationSendMessageRequest)
    {
        const pushNotification = new PushNotification();
        pushNotification.subscription = payload.getSubscription();

        pushNotification.name = payload.getName();

        const eventHandler = EventHandler.getInstance();
        const message = payload.getMessage();
        eventHandler.execute(SendMessageEvent.SEND_MESSAGE_EVENT, {pushNotification, message});

        return {message: 'We\'ve sent you a notification'};
    }
}

export default SendPushNotificationUseCase;
