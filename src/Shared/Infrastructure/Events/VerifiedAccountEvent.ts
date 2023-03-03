import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';

class VerifiedAccountEvent
{
    public static VERIFIED_ACCOUNT_EVENT = 'VERIFIED_ACCOUNT_EVENT';

    public static handle = async(props: any) =>
    {
        const { emailNotification, args } = props;

        const emailNotifier: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotifier.emailNotification = emailNotification;
        emailNotifier.templatePathNameFile = 'auth/verifiedAccount.hbs';
        emailNotifier.data = args;

        await emailNotifier.send();
    };
}

export default VerifiedAccountEvent;
