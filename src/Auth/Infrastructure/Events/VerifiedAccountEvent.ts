import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';
import IEvent from '../../../Shared/Infrastructure/Events/IEvent';

class VerifiedAccountEvent implements IEvent
{
    public name = VerifiedAccountEvent.name;

    public handle = async(props: any) =>
    {
        const { emailNotification, args } =  props;

        const emailNotifier: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotifier.emailNotification = emailNotification;
        emailNotifier.templatePathNameFile = 'auth/verifiedAccount.hbs';
        emailNotifier.data = args;

        await emailNotifier.send();
    };
}

export default VerifiedAccountEvent;
