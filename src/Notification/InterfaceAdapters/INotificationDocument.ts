import { Document } from 'mongoose';
import INotificationDomain from './INotificationDomain';

interface INotificationDocument extends Document, INotificationDomain {}

export default INotificationDocument;
