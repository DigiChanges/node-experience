import { FACTORIES } from '../../../Config/Injects';
import INotifierStrategy from '../../../Notification/Shared/INotifierStrategy';
import { getRequestContext } from '../../Presentation/Shared/RequestContext';

class SendMessageEvent
{
    public static SEND_MESSAGE_EVENT = 'SEND_MESSAGE_EVENT';

    public static handle = async(props: any) =>
    {
        const { pushNotification, message } = props;
        const { container } = getRequestContext();

        const webPushNotifier: any = container.resolve<INotifierStrategy>(FACTORIES.WebPushStrategy);

        webPushNotifier.pushNotification = pushNotification;
        webPushNotifier.message = message;

        await webPushNotifier.send();
    };
}

export default SendMessageEvent;
