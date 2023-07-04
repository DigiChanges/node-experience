import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';
import IEvent from '../../../Shared/Infrastructure/Events/IEvent';

class RegisterEvent implements IEvent
{
    public name = RegisterEvent.name;

    public handle = async(props: any) =>
    {
        const { emailNotification, args } =  props;

        const emailNotifier: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotifier.emailNotification = emailNotification;
        emailNotifier.templatePathNameFile = 'auth/register.hbs';
        emailNotifier.data = args;

        await emailNotifier.send();
    };
}

export default RegisterEvent;
