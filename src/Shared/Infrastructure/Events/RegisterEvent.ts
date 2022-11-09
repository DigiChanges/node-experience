import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';

class RegisterEvent
{
    public static REGISTER_EVENT = 'REGISTER_EVENT';

    public static handle = async(props: any) =>
    {
        const { emailNotification, args } = props;

        const emailNotifier: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotifier.emailNotification = emailNotification;
        emailNotifier.templatePathNameFile = 'auth/register.hbs';
        emailNotifier.data = args;

        await emailNotifier.send();
    };
}

export default RegisterEvent;
