import {Schema} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import Notification from "../../Entities/Notification";
import EmailNotification from "../../Entities/EmailNotification";
import PushNotification from "../../Entities/PushNotification";

let options = { discriminatorKey: 'kind', timestamps: true };

export const NotificationSchema = new Schema({
    _id: {type: String, default: uuidv4},
    name: {type:String, required: true},
}, options).loadClass(Notification);

export const EmailNotificationSchema = new Schema({
    emailTemplatePath: { type: String, required: true },
    senderName: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    cc: { type: String, default : null },
    subject: { type: String, required: true },
    description: { type: String, default : null }
}, options).loadClass(EmailNotification);

export const PushNotificationSchema = new Schema({
    url: { type: String, required: true }
}, options).loadClass(PushNotification);