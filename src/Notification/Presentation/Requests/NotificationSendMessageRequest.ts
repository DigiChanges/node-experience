import webPush from 'web-push';
import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import NotificationSubscriptionRequest from './NotificationCreateSuscriptionRequest';
import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';

class NotificationSendMessageRequest implements NotificationSendMessagePayload
{
    private readonly name: string;
    private readonly message: string;
    private readonly notification_subscription_request: NotificationRepPayload;

    constructor(data: Record<string, any>)
    {
        this.notification_subscription_request = new NotificationSubscriptionRequest(data);
        this.name = data.name;
        this.message = data.message;
    }

    get_name(): string
    {
        return this.name;
    }

    get_message(): string
    {
        return this.message;
    }

    get_subscription(): webPush.PushSubscription
    {
        return this.notification_subscription_request.get_subscription();
    }
}

export default NotificationSendMessageRequest;
