import Notification from "../Entities/Notification";

class EmailNotification extends Notification
{
    emailTemplatePath : string;
    senderName: string;
    from: string;
    to: string;
    cc?: string;
    subject: string;
    description: string;

    constructor()
    {
        super();
        this.description = "";
    }
}

export default EmailNotification;