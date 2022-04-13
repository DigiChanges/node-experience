import { Document } from 'mongoose';
import INotificationDomain from '../../Domain/Entities/INotificationDomain';

interface INotificationDocument extends Document, INotificationDomain {}

export default INotificationDocument;
