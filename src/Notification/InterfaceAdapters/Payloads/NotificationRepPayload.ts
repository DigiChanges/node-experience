import webPush from 'web-push';

interface NotificationRepPayload
{
    getSubscription(): webPush.PushSubscription,
}

export default NotificationRepPayload;
