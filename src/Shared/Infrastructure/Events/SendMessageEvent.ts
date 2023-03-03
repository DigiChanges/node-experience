import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../../Notification/Shared/NotifierFactory';

class SendMessageEvent
{
    public static SEND_MESSAGE_EVENT = 'SEND_MESSAGE_EVENT';

    public static handle = async(props: any) =>
    {
        const { pushNotification, message } = props;

        const webPushNotifier: any = NotifierFactory.create(FACTORIES.WebPushStrategy);

        webPushNotifier.pushNotification = pushNotification;
        webPushNotifier.message = message;

        await webPushNotifier.send();
    };
}

export default SendMessageEvent;
