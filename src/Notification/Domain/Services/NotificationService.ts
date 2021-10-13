import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import PushNotification from '../Entities/PushNotification';
import EventHandler from '../../../Shared/Events/EventHandler';
import SendMessageEvent from '../../../Shared/Events/SendMessageEvent';
import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';


class NotificationService
{
    private event_handler = EventHandler.getInstance();

    async execute(push_notification: PushNotification, payload: NotificationRepPayload, message: string, name: string)
    {
        push_notification.subscription = payload.get_subscription();
        push_notification.name = name;
        await this.event_handler.execute(SendMessageEvent.SEND_MESSAGE_EVENT, { push_notification, message });

        return { message: 'We\'ve sent you a notification' };
    }

    async create_subscription(payload: NotificationRepPayload)
    {
        const push_notification = new PushNotification();
        const message = 'successful subscription';
        const name = 'Node Experience';

        return await this.execute(push_notification, payload, message, name);
    }

    async send_push_notification(payload: NotificationSendMessagePayload)
    {
        const push_notification = new PushNotification();
        const message = payload.get_message();
        const name = payload.get_name();

        return await this.execute(push_notification, payload, message, name);
    }

}

export default NotificationService;
