import ContainerFactory from '../Factories/ContainerFactory';
import INotificationFactory from '../../Notification/Shared/INotificationFactory';
import { FACTORIES } from '../../Config/Injects/factories';

class RegisterEvent
{
    public static REGISTER_EVENT = 'REGISTER_EVENT';

    public static sendEmailListener = async(props: any) =>
    {
        const { emailNotification, args } = props;

        const notificationFactory = ContainerFactory.create<INotificationFactory>(FACTORIES.INotificationFactory);

        const emailNotificator = notificationFactory.create('email');
        emailNotificator.emailNotification = emailNotification;
        emailNotificator.templatePathNameFile = 'auth/register.hbs';
        emailNotificator.data = args;

        await emailNotificator.send();
    };
}

export default RegisterEvent;
