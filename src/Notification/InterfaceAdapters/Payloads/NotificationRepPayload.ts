import webPush from 'web-push';

interface NotificationRepPayload
{
    get_subscription(): webPush.PushSubscription,
}

export default NotificationRepPayload;
