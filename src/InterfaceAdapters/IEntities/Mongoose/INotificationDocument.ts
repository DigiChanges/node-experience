import {Document} from 'mongoose';
import INotificationDomain from '../../IInfrastructure/INotificationDomain';

interface INotificationDocument extends Document, INotificationDomain {}

export default INotificationDocument;