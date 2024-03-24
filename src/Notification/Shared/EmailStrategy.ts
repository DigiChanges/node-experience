import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import Fs from 'fs';
import { REPOSITORIES } from '../../Shared/DI/Injects';
import INotificationRepository from '../Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from '../Domain/Entities/INotificationDomain';
import AttachmentsFilesService from '../Domain/Services/AttachmentsFilesService';
import StatusNotificationEnum from '../Domain/Enum/StatusNotificationEnum';
import EmailNotification from '../Domain/Entities/EmailNotification';
import INotifierStrategy from './INotifierStrategy';

import container from '../../Shared/DI/container';
import { MainConfig } from '../../Config/MainConfig';
import { ErrorException } from '../../Main/Domain/Errors/ErrorException';

class EmailStrategy implements INotifierStrategy
{
    #repository: INotificationRepository<INotificationDomain>;
    #_emailNotification: EmailNotification;
    #_templatePathNameFile: string;
    #_data: Record<string, any>;
    #_save: boolean;

    constructor()
    {
        this.#repository = container.resolve<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository);
        this.#_save = true;
    }

    get emailNotification(): EmailNotification
    {
        return this.#_emailNotification;
    }

    set emailNotification(emailNotification: EmailNotification)
    {
        this.#_emailNotification = emailNotification;
    }

    set templatePathNameFile(templatePathNameFile: string)
    {
        this.#_templatePathNameFile = templatePathNameFile;
    }

    get templatePathNameFile(): string
    {
        return this.#_templatePathNameFile;
    }

    get data(): Record<string, any>
    {
        return this.#_data;
    }

    set data(data: Record<string, any>)
    {
        this.#_data = data;
    }

    get save(): boolean
    {
        return this.#_save;
    }

    set save(save: boolean)
    {
        this.#_save = save;
    }

    public async send(templatePathNameFile)
    {
        if (!this.#_emailNotification && !this.#_templatePathNameFile && !this.#_data)
        {
            throw new ErrorException({ message: 'You need set an emailNotification, templatePathNameFile and data' }, 'NotificatorException');
        }

        const config = MainConfig.getEnv();

        try
        {
            const host: string = config.SMTP_HOST;
            const port: number = config.SMTP_PORT;
            const secure: boolean = config.SMTP_SECURE_SSL;
            const templateRoot: string = config.SMTP_TEMPLATE_DIR;
            this.#_templatePathNameFile = templatePathNameFile;
            const templateDir = `${process.cwd()}/${templateRoot}/${this.#_templatePathNameFile}`;

            const smtp_config = { host, port, secure };

            if (config.SMTP_USERNAME && config.SMTP_PASSWORD)
            {
                const auth = {
                    auth: {
                        user: String(config.SMTP_USERNAME),
                        pass: String(config.SMTP_PASSWORD)
                    }
                };
                Object.assign(smtp_config, auth);
            }

            this.#_emailNotification.senderName = config.SMTP_SENDER_NAME;
            this.#_emailNotification.from = config.SMTP_SENDER_EMAIL_DEFAULT;
            this.#_emailNotification.emailTemplatePath = templateDir;

            const transporter = nodemailer.createTransport(smtp_config);

            const source = Fs.readFileSync(templateDir).toString();

            const template = Handlebars.compile(source);

            const html = template(this.#_data);

            const mailData = {
                from: `"${  this.#_emailNotification.senderName  }" <${ this.#_emailNotification.from }>`,
                to:  this.#_emailNotification.to,
                subject: this.#_emailNotification.subject,
                html
            };

            if (this.#_emailNotification?.cc)
            {
                Object.assign(mailData, { cc: this.#_emailNotification.cc });
            }

            if (this.#_emailNotification?.bcc)
            {
                Object.assign(mailData, { bcc: this.#_emailNotification.bcc });
            }

            if (this.#_emailNotification?.attachedFiles)
            {
                Object.assign(mailData, { attachments: await AttachmentsFilesService.getTempFilesAttachments(this.#_emailNotification) });
            }

            return await transporter.sendMail(mailData)
                .then(() =>
                {
                    if (this.#_save)
                    {
                        this.#_emailNotification.htmlRender = html;
                        void this.#repository.save(this.#_emailNotification);
                    }

                    return true;
                })
                .catch(async(err: any) =>
                {
                    if (this.#_save)
                    {
                        this.#_emailNotification.htmlRender = html;
                        this.#_emailNotification.status = StatusNotificationEnum.FAILED;
                        void this.#repository.save(this.#_emailNotification);
                    }

                    await AttachmentsFilesService.unlinkTempFilesAttachments(this.#_emailNotification.attachedFiles);

                    throw new ErrorException({ message: `Something is wrong. Please try again later, ${err.message}` }, 'EmailStrategy');
                });
        }
        catch (e: any)
        {
            throw new ErrorException({ message: e.message }, 'EmailStrategy');
        }
    }
}

export default EmailStrategy;
