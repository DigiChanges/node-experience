import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import PushNotification from '../Entities/PushNotification';
import EventHandler from '../../../Shared/Events/EventHandler';
import SendMessageEvent from '../../../Shared/Events/SendMessageEvent';
import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';


class NotificationService
{

    async execute(pushNotification: PushNotification, message: string)
    {
        const eventHandler = EventHandler.getInstance();
        await eventHandler.execute(SendMessageEvent.SEND_MESSAGE_EVENT, { pushNotification, message });

        return { message: 'We\'ve sent you a notification' };
    }

    async createSubscription(payload: NotificationRepPayload)
    {
        const pushNotification = new PushNotification();
        const message = 'successful subscription';

        pushNotification.subscription = payload.getSubscription();
        pushNotification.name = 'Node Experience';

        return await this.execute(pushNotification, message);
    }

    async sendPushNotification(payload: NotificationSendMessagePayload)
    {
        const pushNotification = new PushNotification();
        const message = payload.getMessage();

        pushNotification.subscription = payload.getSubscription();
        pushNotification.name = payload.getName();

        return await this.execute(pushNotification, message);
    }

}

export default NotificationService;
