import ContainerFactory from '../Factories/ContainerFactory';
import INotificationFactory from '../../Notification/Shared/INotificationFactory';
import { FACTORIES } from '../../Config/Injects/factories';

class ForgotPasswordEvent
{
    public static FORGOT_PASSWORD_EVENT = 'FORGOT_PASSWORD_EVENT';

    public static forgotPasswordListener = async(props: any) =>
    {
        const { emailNotification, args } = props;

        const notificationFactory = ContainerFactory.create<INotificationFactory>(FACTORIES.INotificationFactory);

        const emailNotificator = notificationFactory.create('email');
        emailNotificator.emailNotification = emailNotification;
        emailNotificator.templatePathNameFile = 'auth/forgotPassword.hbs';
        emailNotificator.data = args;

        await emailNotificator.send();
    };
}

export default ForgotPasswordEvent;
