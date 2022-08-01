import { FACTORIES } from '../../../Config/Injects';
import INotifierStrategy from '../../../Notification/Shared/INotifierStrategy';
import { getRequestContext } from '../../Presentation/Shared/RequestContext';

class VerifiedAccountEvent
{
    public static VERIFIED_ACCOUNT_EVENT = 'VERIFIED_ACCOUNT_EVENT';

    public static handle = async(props: any) =>
    {
        const { emailNotification, args } = props;
        const { container } = getRequestContext();

        const emailNotifier: any = container.resolve<INotifierStrategy>(FACTORIES.EmailStrategy);

        emailNotifier.emailNotification = emailNotification;
        emailNotifier.templatePathNameFile = 'auth/verifiedAccount.hbs';
        emailNotifier.data = args;

        await emailNotifier.send();
    };
}

export default VerifiedAccountEvent;
