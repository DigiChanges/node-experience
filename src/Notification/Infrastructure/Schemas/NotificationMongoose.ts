import * as mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import Notification from '../../Domain/Entities/Notification';
import EmailNotification from '../../Domain/Entities/EmailNotification';
import PushNotification from '../../Domain/Entities/PushNotification';
import StatusNotificationEnum from '../../Domain/Enum/StatusNotificationEnum';
import INotificationDomain from '../../Domain/Entities/INotificationDomain';

export type NotificationMongooseDocument = Document & INotificationDomain;

const options = { discriminatorKey: 'kind', timestamps: true };

export const NotificationSchema: any = new mongoose.Schema<Notification>({
    _id: { type: String, default: randomUUID },
    name: { type:String, required: true }
}, options).loadClass(Notification);

export const EmailNotificationSchema = new mongoose.Schema<EmailNotification>({
    status: { type: String, enum: StatusNotificationEnum, default: StatusNotificationEnum.SUCCESS },
    emailTemplatePath: { type: String, required: true },
    htmlRender: { type: String, default : null },
    senderName: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    cc: { type: String, default : null },
    bcc: { type: String, default : null },
    subject: { type: String, required: true },
    external: { type: Boolean, default: false },
    attachedFiles: [{ type: mongoose.Schema.Types.String, ref: 'File', required: false }],
    data: { type: Object,  required: false }
}, options).loadClass(EmailNotification);

export const PushNotificationSchema = new mongoose.Schema({
    url: { type: String, required: true }
}, options).loadClass(PushNotification);

