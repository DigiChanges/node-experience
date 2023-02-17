import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';
import { DataEventToken } from '@deepkit/event';
import IDataEvent from './IDataEvent';

class VerifiedAccountEvent extends DataEventToken<any> implements IDataEvent
{
    public static VERIFIED_ACCOUNT_EVENT = 'VERIFIED_ACCOUNT_EVENT';

    constructor()
    {
        super(VerifiedAccountEvent.VERIFIED_ACCOUNT_EVENT);
    }

    public handle = async(props: any) =>
    {
        const { emailNotification, args } =  props.data;

        const emailNotifier: any = NotifierFactory.create(FACTORIES.EmailStrategy);

        emailNotifier.emailNotification = emailNotification;
        emailNotifier.templatePathNameFile = 'auth/verifiedAccount.hbs';
        emailNotifier.data = args;

        await emailNotifier.send();
    };
}

export default VerifiedAccountEvent;
