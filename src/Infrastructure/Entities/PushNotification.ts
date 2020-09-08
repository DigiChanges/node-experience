import Notification from "../Entities/Notification";

class PushNotification extends Notification
{
    url: string;

    constructor()
    {
        super();
    }
}

export default PushNotification;