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

    get_subscription()
    {
        return this.subscription;
    }
}

export default PushNotification;
