import INotificationDomain from './INotificationDomain';
import { Base } from '@digichanges/shared-experience';

class Notification extends Base implements INotificationDomain
{
    name: string;
}

export default Notification;
