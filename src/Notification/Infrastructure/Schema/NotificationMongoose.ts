import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../../Domain/Entities/Notification';
import EmailNotification from '../../Domain/Entities/EmailNotification';
import PushNotification from '../../Domain/Entities/PushNotification';

const options = { discriminatorKey: 'kind', timestamps: true };

export const NotificationSchema: any = new Schema({
    _id: { type: String, default: uuidv4 },
    name: { type:String, required: true }
}, options).loadClass(Notification);

export const EmailNotificationSchema: any = new Schema({
    email_template_path: { type: String, required: true },
    sender_name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    cc: { type: String, default : null },
    subject: { type: String, required: true },
    description: { type: String, default : null }
}, options).loadClass(EmailNotification);

export const PushNotificationSchema: any = new Schema({
    url: { type: String, required: true }
}, options).loadClass(PushNotification);
