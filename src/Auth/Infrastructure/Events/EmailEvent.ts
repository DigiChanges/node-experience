import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';
import IEvent from '../../../Shared/Infrastructure/Events/IEvent';

class EmailEvent implements IEvent
{
    public name: string = EmailEvent.name;

    public handle = async(props: any) =>
    {
        const { emailNotification, args } =  props;

        const emailNotificator: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotificator.emailNotification = emailNotification;
        emailNotificator.templatePathNameFile = args.templatePathNameFile;
        emailNotificator.data = args;

        await emailNotificator.send(emailNotificator.templatePathNameFile);
    };
}

export default EmailEvent;
