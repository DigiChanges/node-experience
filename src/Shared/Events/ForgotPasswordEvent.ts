import INotifierStrategy from '../../Notification/Shared/INotifierStrategy';
import { FACTORIES } from '../../Config/Injects';
import container from '../../register';

class ForgotPasswordEvent
{
    public static FORGOT_PASSWORD_EVENT = 'FORGOT_PASSWORD_EVENT';

    public static handle = async(props: any) =>
    {
        const { emailNotification, args } = props;

        const emailNotificator: any = container.resolve<INotifierStrategy>(FACTORIES.EmailStrategy);

        emailNotificator.emailNotification = emailNotification;
        emailNotificator.templatePathNameFile = 'auth/forgotPassword.hbs';
        emailNotificator.data = args;

        await emailNotificator.send();
    };
}

export default ForgotPasswordEvent;
