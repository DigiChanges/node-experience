import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';
import { DataEventToken } from '@deepkit/event';
import IDataEvent from './IDataEvent';

class SendMessageEvent extends DataEventToken<any> implements IDataEvent
{
    public static SEND_MESSAGE_EVENT = 'SEND_MESSAGE_EVENT';

    constructor()
    {
        super(SendMessageEvent.SEND_MESSAGE_EVENT);
    }

    public handle = async(props: any) =>
    {
        const { pushNotification, message } =  props.data;

        const webPushNotifier: any = NotifierFactory.create(FACTORIES.WebPushStrategy);

        webPushNotifier.pushNotification = pushNotification;
        webPushNotifier.message = message;

        await webPushNotifier.send();
    };
}

export default SendMessageEvent;
