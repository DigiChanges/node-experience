import { FACTORIES } from '../../../Config/Injects';
import INotifierStrategy from '../../../Notification/Shared/INotifierStrategy';
import container from '../../../register';

class SendMessageEvent
{
    public static SEND_MESSAGE_EVENT = 'SEND_MESSAGE_EVENT';

    public static handle = async(props: any) =>
    {
        const { pushNotification, message } = props;

        const webPushNotifier: any = container.resolve<INotifierStrategy>(FACTORIES.WebPushStrategy);

        webPushNotifier.pushNotification = pushNotification;
        webPushNotifier.message = message;

        await webPushNotifier.send();
    };
}

export default SendMessageEvent;
