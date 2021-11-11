import MainConfig from '../../Config/mainConfig';
import Fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import webPush from 'web-push';
import path from 'path';
import { ErrorException } from '@digichanges/shared-experience';

import EmailNotification from '../Domain/Entities/EmailNotification';
import PushNotification from '../Domain/Entities/PushNotification';
import ContainerFactory from '../../Shared/Factories/ContainerFactory';
import INotificationRepository from '../InterfaceAdapters/INotificationRepository';
import INotificationDomain from '../InterfaceAdapters/INotificationDomain';
import { REPOSITORIES } from '../../repositories';
import StatusNotificationEnum from '../Domain/Enum/StatusNotificationEnum';
import AttachmentsFilesService from '../Domain/Services/AttachmentsFilesService';

class Notificator
{
    // TODO: This need more abstraction
    public static async sendEmail(emailNotification: EmailNotification, template_path_name_file: string, data: any = {}, save = true)
    {
        const repository = ContainerFactory.create<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository);
        const config = MainConfig.getInstance();

        try
        {
            const host: string = config.getConfig().mail.host;
            const port: number = config.getConfig().mail.port;
            const secure: boolean = config.getConfig().mail.secure === true;
            const templateRoot: string = config.getConfig().mail.templateDir;
            const templateDir = `${path.dirname(require.main.filename || process.mainModule.filename)  }/${templateRoot}/${template_path_name_file}`;

            const smtp_config = { host, port, secure };

            if (smtp_config.secure)
            {
                const auth = {
                    auth: {
                        user: String(config.getConfig().mail.username),
                        pass: String(config.getConfig().mail.password)
                    }
                };
                Object.assign(smtp_config, auth);
            }

            emailNotification.senderName = config.getConfig().mail.senderName;
            emailNotification.from = config.getConfig().mail.senderEmailDefault;
            emailNotification.emailTemplatePath = templateDir;

            const transporter = nodemailer.createTransport(smtp_config);

            const source = Fs.readFileSync(templateDir).toString();

            const template = Handlebars.compile(source);

            const html = template(data);

            const mailData = {
                from: `"${  emailNotification.senderName  }" <${  emailNotification.from  }>`,
                to:  emailNotification.to,
                subject: emailNotification.subject,
                html
            };

            if (emailNotification?.cc)
            {
                Object.assign(mailData, { cc: emailNotification.cc });
            }

            if (emailNotification?.bcc)
            {
                Object.assign(mailData, { bcc: emailNotification.bcc });
            }

            if (emailNotification?.attachedFiles)
            {
                Object.assign(mailData, { attachments: await AttachmentsFilesService.getTempFilesAttachments(emailNotification) });
            }

            return await transporter.sendMail(mailData)
                .then(() =>
                {
                    if (save)
                    {
                        emailNotification.htmlRender = html;
                        void repository.save(emailNotification);
                    }

                    return true;
                })
                .catch((err: any) =>
                {
                    if (save)
                    {
                        emailNotification.htmlRender = html;
                        emailNotification.status = StatusNotificationEnum.FAILED;
                        void repository.save(emailNotification);
                    }

                    AttachmentsFilesService.unlinkTempFilesAttachments(emailNotification.tempFilesAttachments);

                    throw new ErrorException({ message: 'Something is wrong. Please try again later' }, 'NotificatorException');
                });
        }
        catch (e)
        {
            throw Error('Error to send Email');
        }
    }

    public static async sendPushNotification(pushNotification: PushNotification, message: string)
    {
        const config = MainConfig.getInstance();
        try
        {
            const publicKey: string = config.getConfig().push.publicKey;
            const privateKey: string = config.getConfig().push.privateKey;
            const subject: string = config.getConfig().url.urlWeb;

            const pushSubscription = pushNotification.get_subscription();

            const payload = JSON.stringify({
                name: pushNotification.name,
                message
            });

            const options = {
                vapidDetails: {
                    subject,
                    publicKey,
                    privateKey
                }
            };

            return await webPush.sendNotification(pushSubscription, payload, options);
        }
        catch (e)
        {
            throw Error('Error to send Push Notification');
        }
    }
}

export default Notificator;
