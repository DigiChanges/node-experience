import Notificator from '../../Notification/Services/Notificator';

class ForgotPasswordEvent
{
    public static FORGOT_PASSWORD_EVENT = 'FORGOT_PASSWORD_EVENT';

    public static forgotPasswordListener = async(props: any) =>
    {
        const { emailNotification, urlConfirmationToken } = props;

        setTimeout(() =>
        {
            void Notificator.send_email(emailNotification, 'auth/forgot_password.hbs', { urlConfirmationToken });
        }, 1000);
    }
}

export default ForgotPasswordEvent;
