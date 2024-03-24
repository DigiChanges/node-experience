import INotificationDomain from './INotificationDomain';
import { Base } from '../../../Main/Domain/Entities';

class Notification extends Base implements INotificationDomain
{
    name: string;
}

export default Notification;
