import Notificator from '../../Notification/Services/Notificator';

class RegisterEvent
{
    public static REGISTER_EVENT = 'REGISTER_EVENT';

    public static sendEmailListener = async(props: any) =>
    {
        const { emailNotification, args } = props;

        setTimeout(() =>
        {
            void Notificator.sendEmail(emailNotification, 'auth/register.hbs', args);
        }, 1000);
    }
}

export default RegisterEvent;
