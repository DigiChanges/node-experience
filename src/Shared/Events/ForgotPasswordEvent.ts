import Notificator from '../../Notification/Services/Notificator';

class ForgotPasswordEvent
{
    public static FORGOT_PASSWORD_EVENT = 'FORGOT_PASSWORD_EVENT';

    public static forgotPasswordListener = async(props: any) =>
    {
        const { emailNotification, args } = props;

        setTimeout(() =>
        {
            void Notificator.sendEmail(emailNotification, 'auth/forgotPassword.hbs', args);
        }, 1000);
    }
}

export default ForgotPasswordEvent;
