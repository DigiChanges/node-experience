import webPush from 'web-push';
import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import NotificationSubscriptionRequest from './NotificationCreateSuscriptionRequest';
import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';

class NotificationSendMessageRequest implements NotificationSendMessagePayload
{
    private readonly name: string;
    private readonly message: string;
    private readonly notificationSubscriptionRequest: NotificationRepPayload;

    constructor(data: Record<string, any>)
    {
        this.notificationSubscriptionRequest = new NotificationSubscriptionRequest(data);
        this.name = data.name;
        this.message = data.message;
    }

    getName(): string
    {
        return this.name;
    }

    getMessage(): string
    {
        return this.message;
    }

    getSubscription(): webPush.PushSubscription
    {
        return this.notificationSubscriptionRequest.getSubscription();
    }
}

export default NotificationSendMessageRequest;
