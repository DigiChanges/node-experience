import Notification from './Notification';

class EmailNotification extends Notification
{
    emailTemplatePath : string;
    senderName: string;
    from: string;
    to: string;
    cc: string;
    subject: string;
    description: string;

    constructor()
    {
        super();
        this.cc = null;
        this.description = null;
    }
}

export default EmailNotification;
