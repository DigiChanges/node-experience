import Notification from "../Entities/Notification";
import webPush from "web-push";

class PushNotification extends Notification
{
    subscription: webPush.PushSubscription;
    title: string;

    constructor()
    {
        super();
        this.title = null;
    }

    getSubscription()
    {
        return this.subscription;
    }
}

export default PushNotification;