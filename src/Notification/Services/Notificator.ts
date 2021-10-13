import Config from 'config';
import Fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import webPush from 'web-push';
import path from 'path';
import { ErrorException } from '@digichanges/shared-experience';

import EmailNotification from '../Domain/Entities/EmailNotification';
import NotificationMongoRepository from '../Infrastructure/Repositories/NotificationMongoRepository';
import PushNotification from '../Domain/Entities/PushNotification';

class Notificator
{
    // TODO: This need more abstraction
    public static async send_email(email_notification: EmailNotification, template_path_name_file: string, data: any = {}, save = true)
    {
        const repository = new NotificationMongoRepository();

        try
        {
            const host: string = Config.get('mail.host');
            const port: number = Config.get('mail.port');
            const secure: boolean = Config.get('mail.secure') === 'true';
            const template_root: string = Config.get('mail.template_dir');
            const template_dir = `${path.dirname(require.main.filename || process.mainModule.filename)  }/${template_root}/${template_path_name_file}`;

            const smtp_config = { host, port, secure };

            if (smtp_config.secure)
            {
                const auth = {
                    auth: {
                        user: String(Config.get('mail.username')),
                        pass: String(Config.get('mail.password'))
                    }
                };
                Object.assign(smtp_config, auth);
            }

            email_notification.sender_name = Config.get('mail.sender_name');
            email_notification.from = Config.get('mail.senderEmailDefault');
            email_notification.email_template_path = template_dir;

            const transporter = nodemailer.createTransport(smtp_config);

            const source = Fs.readFileSync(template_dir).toString();

            const template = Handlebars.compile(source);

            const html = template(data);

            const mail_data = {
                from: `"${  email_notification.sender_name  }" <${  email_notification.from  }>`,
                to:  email_notification.to,
                subject: email_notification.subject,
                html
            };

            if (email_notification.cc)
            {
                Object.assign(mail_data, { cc: email_notification.cc });
            }

            return await transporter.sendMail(mail_data)
                .then(() =>
                {
                    if (save)
                    {
                        void repository.save(email_notification);
                    }

                    return true;
                })
                .catch((err: any) =>
                {
                    if (save)
                    {
                        email_notification.description = err;
                        void repository.save(email_notification);
                    }
                    throw new ErrorException('Something is wrong. Please try again later.', 'NotificatorException');
                });
        }
        catch (e)
        {
            throw Error('Error to send Email');
        }
    }

    public static async send_push_notification(push_notification: PushNotification, message: string)
    {
        try
        {
            const publicKey: string = Config.get('push.publicKey');
            const privateKey: string = Config.get('push.privateKey');
            const subject: string = Config.get('url.urlWeb');

            const push_subscription = push_notification.get_subscription();

            const payload = JSON.stringify({
                name: push_notification.name,
                message
            });

            const options = {
                vapidDetails: {
                    subject,
                    publicKey,
                    privateKey
                }
            };

            return await webPush.sendNotification(push_subscription, payload, options);
        }
        catch (e)
        {
            throw Error('Error to send Push Notification');
        }
    }
}

export default Notificator;
