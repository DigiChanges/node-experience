import PushNotification from '../Entities/PushNotification';
import EventHandler from '../../../Shared/Events/EventHandler';
import SendMessageEvent from '../../../Shared/Events/SendMessageEvent';
import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';

class CreateSubscriptionUseCase
{
    async handle(payload: NotificationRepPayload)
    {
        const pushNotification = new PushNotification();

        pushNotification.subscription = payload.getSubscription();
        pushNotification.name = 'Node Experience';

        const eventHandler = EventHandler.getInstance();
        const message = 'successful subscription';
        await eventHandler.execute(SendMessageEvent.SEND_MESSAGE_EVENT, { pushNotification, message });

        return { message: 'We\'ve sent you a notification' };
    }
}

export default CreateSubscriptionUseCase;
