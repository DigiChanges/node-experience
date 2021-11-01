import { mainConfig } from '../../Config/mainConfig';
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

class Notificator
{
    // TODO: This need more abstraction
    public static async sendEmail(emailNotification: EmailNotification, template_path_name_file: string, data: any = {}, save = true)
    {
        const repository = ContainerFactory.create<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository);

        try
        {
            const host: string = mainConfig.mail.host;
            const port: number = mainConfig.mail.port;
            const secure: boolean = mainConfig.mail.secure === true;
            const templateRoot: string = mainConfig.mail.templateDir;
            const templateDir = `${path.dirname(require.main.filename || process.mainModule.filename)  }/${templateRoot}/${template_path_name_file}`;

            const smtp_config = { host, port, secure };

            if (smtp_config.secure)
            {
                const auth = {
                    auth: {
                        user: String(mainConfig.mail.username),
                        pass: String(mainConfig.mail.password)
                    }
                };
                Object.assign(smtp_config, auth);
            }

            emailNotification.senderName = mainConfig.mail.senderName;
            emailNotification.from = mainConfig.mail.senderEmailDefault;
            emailNotification.emailTemplatePath = templateDir;

            const transporter = nodemailer.createTransport(smtp_config);

            const source = Fs.readFileSync(templateDir).toString();

            const template = Handlebars.compile(source);

            const html = template(data);

            const mail_data = {
                from: `"${  emailNotification.senderName  }" <${  emailNotification.from  }>`,
                to:  emailNotification.to,
                subject: emailNotification.subject,
                html
            };

            if (emailNotification.cc)
            {
                Object.assign(mail_data, { cc: emailNotification.cc });
            }

            return await transporter.sendMail(mail_data)
                .then(() =>
                {
                    if (save)
                    {
                        void repository.save(emailNotification);
                    }

                    return true;
                })
                .catch((err: any) =>
                {
                    if (save)
                    {
                        emailNotification.description = err;
                        void repository.save(emailNotification);
                    }
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
        try
        {
            const publicKey: string = mainConfig.push.publicKey;
            const privateKey: string = mainConfig.push.privateKey;
            const subject: string = mainConfig.url.urlWeb;

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
