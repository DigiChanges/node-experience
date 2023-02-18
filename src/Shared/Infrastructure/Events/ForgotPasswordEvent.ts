import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';
import { DataEventToken } from '@deepkit/event';
import IDataEvent from './IDataEvent';

class ForgotPasswordEvent extends DataEventToken<any> implements IDataEvent
{
    public static FORGOT_PASSWORD_EVENT = 'FORGOT_PASSWORD_EVENT';

    constructor()
    {
        super(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT);
    }

    public handle = async(props: any) =>
    {
        const { emailNotification, args } =  props.data;

        const emailNotificator: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotificator.emailNotification = emailNotification;
        emailNotificator.templatePathNameFile = 'auth/forgotPassword.hbs';
        emailNotificator.data = args;

        await emailNotificator.send();
    };
}

export default ForgotPasswordEvent;
