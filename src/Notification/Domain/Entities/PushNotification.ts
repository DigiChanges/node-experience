import webPush from 'web-push';
import Notification from './Notification';

class PushNotification extends Notification
{
    subscription: webPush.PushSubscription;
    url: string;

    constructor()
    {
        super();
        this.url = null;
    }

    getSubscription()
    {
        return this.subscription;
    }
}

export default PushNotification;
