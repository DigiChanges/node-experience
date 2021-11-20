import INotificationDomain from '../../InterfaceAdapters/INotificationDomain';
import Base from '../../../App/Domain/Entities/Base';

class Notification extends Base implements INotificationDomain
{
    name: string;
}

export default Notification;
