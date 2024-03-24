import NotificationRepPayload from '../Payloads/NotificationRepPayload';
import PushNotification from '../Entities/PushNotification';
import SendMessageEvent from '../Events/SendMessageEvent';
import NotificationSendMessagePayload from '../Payloads/NotificationSendMessagePayload';
import INotificationResponse from '../Entities/INotificationResponse';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';
import { IEventHandler } from '../Models/EventHandler';

class NotificationService
{
    #eventHandler: IEventHandler;

    async execute(pushNotification: PushNotification, payload: NotificationRepPayload, message: string, name: string): Promise<INotificationResponse>
    {
        this.#eventHandler = DependencyInjector.inject<IEventHandler>('IEventHandler');
        pushNotification.subscription = payload.getSubscription();
        pushNotification.name = name;
        this.#eventHandler.execute(SendMessageEvent.name, { push_notification: pushNotification, message });

        return { message: 'We\'ve sent you a notification' };
    }

    async createSubscription(payload: NotificationRepPayload): Promise<INotificationResponse>
    {
        const pushNotification = new PushNotification();
        const message = 'successful subscription';
        const name = 'Node Experience';

        return await this.execute(pushNotification, payload, message, name);
    }

    async sendPushNotification(payload: NotificationSendMessagePayload): Promise<INotificationResponse>
    {
        const pushNotification = new PushNotification();
        const message = payload.getMessage();
        const name = payload.getName();

        return await this.execute(pushNotification, payload, message, name);
    }
}

export default NotificationService;
