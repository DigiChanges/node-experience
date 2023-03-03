import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';

class ForgotPasswordEvent
{
    public static FORGOT_PASSWORD_EVENT = 'FORGOT_PASSWORD_EVENT';

    public static handle = async(props: any) =>
    {
        const { emailNotification, args } = props;

        const emailNotificator: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotificator.emailNotification = emailNotification;
        emailNotificator.templatePathNameFile = 'auth/forgotPassword.hbs';
        emailNotificator.data = args;

        await emailNotificator.send();
    };
}

export default ForgotPasswordEvent;
