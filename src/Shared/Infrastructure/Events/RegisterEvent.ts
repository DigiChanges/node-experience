import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';
import { DataEventToken } from '@deepkit/event';
import IDataEvent from './IDataEvent';

class RegisterEvent extends DataEventToken<any> implements IDataEvent
{
    public static REGISTER_EVENT = 'REGISTER_EVENT';

    constructor()
    {
        super(RegisterEvent.REGISTER_EVENT);
    }

    public handle = async(props: any) =>
    {
        const { emailNotification, args } =  props.data;

        const emailNotifier: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotifier.emailNotification = emailNotification;
        emailNotifier.templatePathNameFile = 'auth/register.hbs';
        emailNotifier.data = args;

        await emailNotifier.send();
    };
}

export default RegisterEvent;
