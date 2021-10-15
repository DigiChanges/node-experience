import webPush from 'web-push';
import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';

class NotificationSubscriptionRequest implements NotificationRepPayload
{
    private readonly subscription: webPush.PushSubscription;

    constructor(data: Record<string, any>)
    {
        this.subscription = data.subscription;
    }

    getSubscription(): webPush.PushSubscription
    {
        return this.subscription;
    }
}

export default NotificationSubscriptionRequest;
