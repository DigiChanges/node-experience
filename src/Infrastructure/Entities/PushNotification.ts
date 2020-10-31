import Notification from "../Entities/Notification";
import webPush from "web-push";

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