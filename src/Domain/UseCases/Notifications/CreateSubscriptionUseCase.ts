import PushNotification from '../../../Infrastructure/Entities/PushNotification';
import EventHandler from '../../../Infrastructure/Events/EventHandler';
import SendMessageEvent from '../../../Infrastructure/Events/SendMessageEvent';
import NotificationRepPayload from '../../../InterfaceAdapters/Payloads/Notifications/NotificationRepPayload';

class CreateSubscriptionUseCase
{
    handle(payload: NotificationRepPayload)
    {
        const pushNotification = new PushNotification();

        pushNotification.subscription = payload.getSubscription();
        pushNotification.name = 'Node Experience';

        const eventHandler = EventHandler.getInstance();
        const message = 'successful subscription';
        eventHandler.execute(SendMessageEvent.SEND_MESSAGE_EVENT, {pushNotification, message});

        return {message: 'We\'ve sent you a notification'};
    }
}

export default CreateSubscriptionUseCase;
