import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../../Domain/Entities/Notification';
import EmailNotification from '../../Domain/Entities/EmailNotification';
import PushNotification from '../../Domain/Entities/PushNotification';
import StatusNotificationEnum from '../../Domain/Enum/StatusNotificationEnum';

const options = { discriminatorKey: 'kind', timestamps: true };

export const NotificationSchema: any = new Schema<Notification>({
    _id: { type: String, default: uuidv4 },
    name: { type:String, required: true }
}, options).loadClass(Notification);

export const EmailNotificationSchema: any = new Schema<EmailNotification>({
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
    attachedFiles: [{ type: Schema.Types.String, ref: 'File', required: false }],
    data: { type: Object,  required: false }
}, options).loadClass(EmailNotification);

export const PushNotificationSchema: any = new Schema({
    url: { type: String, required: true }
}, options).loadClass(PushNotification);
