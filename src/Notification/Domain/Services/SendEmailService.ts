import EventHandler from '../../../Shared/Events/EventHandler';
import ISendEmailParams from '../../InterfaceAdapters/ISendEmailParams';
import EmailNotification from '../Entities/EmailNotification';

class SendEmailService
{
    public static async handle(params: ISendEmailParams): Promise<void>
    {
        const { type, args, event, name, files, data, cc, bcc, to, subject, external } = params;

        const emailNotification = new EmailNotification();

        emailNotification.name = name;
        emailNotification.to = to;
        emailNotification.cc = cc && cc.length > 0 ? cc.join(',') : null;
        emailNotification.bcc = bcc && bcc.length > 0 ? bcc.join(',') : null;
        emailNotification.subject = subject ?? name;
        emailNotification.data = data ?? null;
        emailNotification.attachedFiles = files ?? [];
        emailNotification.type = type;
        emailNotification.external = external ?? false;

        const eventHandler = EventHandler.getInstance();

        await eventHandler.execute(event, { emailNotification, args });
    }
}

export default SendEmailService;
