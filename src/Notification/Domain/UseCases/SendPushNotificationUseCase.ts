import PushNotification from '../Entities/PushNotification';
import EventHandler from '../../../Shared/Events/EventHandler';
import SendMessageEvent from '../../../Shared/Events/SendMessageEvent';
import NotificationSendMessageRequest from '../../Presentation/Requests/NotificationSendMessageRequest';

class SendPushNotificationUseCase
{
    async handle(payload: NotificationSendMessageRequest)
    {
        const pushNotification = new PushNotification();
        pushNotification.subscription = payload.getSubscription();

        pushNotification.name = payload.getName();

        const eventHandler = EventHandler.getInstance();
        const message = payload.getMessage();
        await eventHandler.execute(SendMessageEvent.SEND_MESSAGE_EVENT, {pushNotification, message});

        return {message: 'We\'ve sent you a notification'};
    }
}

export default SendPushNotificationUseCase;
