import Notification from './Notification';

class EmailNotification extends Notification
{
    email_template_path : string;
    sender_name: string;
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
