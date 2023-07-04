import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';
import IEvent from '../../../Shared/Infrastructure/Events/IEvent';

class ForgotPasswordEvent implements IEvent
{
    public name: string = ForgotPasswordEvent.name;

    public handle = async(props: any) =>
    {
        const { emailNotification, args } =  props;

        const emailNotificator: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotificator.emailNotification = emailNotification;
        emailNotificator.templatePathNameFile = 'auth/forgotPassword.hbs';
        emailNotificator.data = args;

        await emailNotificator.send();
    };
}

export default ForgotPasswordEvent;
