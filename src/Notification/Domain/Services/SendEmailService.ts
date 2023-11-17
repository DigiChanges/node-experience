import { EventHandler } from '@digichanges/shared-experience';
import ISendEmailParams from '../Entities/ISendEmailParams';
import EmailNotification from '../Entities/EmailNotification';

class SendEmailService
{
    private static emailEvent = 'EmailEvent';
    public static async handle(params: ISendEmailParams): Promise<void>
    {
        const { type, args, name, files,
            data, cc, bcc, to, subject, external, templatePathNameFile } = params;

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
        args.templatePathNameFile = templatePathNameFile;

        const eventHandler = EventHandler.getInstance();

        eventHandler.execute(this.emailEvent, { emailNotification, args });
    }
}

export default SendEmailService;
