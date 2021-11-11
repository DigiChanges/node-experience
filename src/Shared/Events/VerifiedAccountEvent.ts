import Notificator from '../../Notification/Services/Notificator';

class VerifiedAccountEvent
{
    public static VERIFIED_ACCOUNT_EVENT = 'VERIFIED_ACCOUNT_EVENT';

    public static sendEmailListener = async(props: any) =>
    {
        const { emailNotification, args } = props;

        setTimeout(() =>
        {
            void Notificator.sendEmail(emailNotification, 'auth/verifiedAccount.hbs', args);
        }, 1000);
    }
}

export default VerifiedAccountEvent;
