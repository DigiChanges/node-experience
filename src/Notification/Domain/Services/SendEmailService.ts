import ISendEmailParams from '../Entities/ISendEmailParams';
import EmailNotification from '../Entities/EmailNotification';
import NotifierFactory from '../../Shared/NotifierFactory';
import { FACTORIES } from '../../../Shared/DI/Injects';

class SendEmailService
{
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

        const emailNotificator: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotificator.emailNotification = emailNotification;
        emailNotificator.templatePathNameFile = args.templatePathNameFile;
        emailNotificator.data = args;

        await emailNotificator.send(emailNotificator.templatePathNameFile);
    }
}

export default SendEmailService;
