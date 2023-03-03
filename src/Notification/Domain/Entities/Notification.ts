import INotificationDomain from './INotificationDomain';
import Base from '../../../Shared/Domain/Entities/Base';

class Notification extends Base implements INotificationDomain
{
    name: string;
}

export default Notification;
