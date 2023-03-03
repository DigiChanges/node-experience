import { Document } from 'mongoose';
import INotificationDomain from '../../Domain/Entities/INotificationDomain';

type NotificationMongooseDocument = Document & INotificationDomain

export default NotificationMongooseDocument;
