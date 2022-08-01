import { FACTORIES } from '../../../Config/Injects';
import container from '../../../register';
import INotifierStrategy from '../../../Notification/Shared/INotifierStrategy';

class RegisterEvent
{
    public static REGISTER_EVENT = 'REGISTER_EVENT';

    public static handle = async(props: any) =>
    {
        const { emailNotification, args } = props;

        const emailNotifier: any = container.resolve<INotifierStrategy>(FACTORIES.EmailStrategy);

        emailNotifier.emailNotification = emailNotification;
        emailNotifier.templatePathNameFile = 'auth/register.hbs';
        emailNotifier.data = args;

        await emailNotifier.send();
    };
}

export default RegisterEvent;
