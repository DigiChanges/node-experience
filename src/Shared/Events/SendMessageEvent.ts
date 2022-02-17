import ContainerFactory from '../Factories/ContainerFactory';
import INotificationFactory from '../../Notification/Shared/INotificationFactory';
import { FACTORIES } from '../../Config/Injects/factories';

class SendMessageEvent
{
    public static SEND_MESSAGE_EVENT = 'SEND_MESSAGE_EVENT';

    public static sendMessageListener = async(props: any) =>
    {
        const { pushNotification, message } = props;

        const notificationFactory = ContainerFactory.create<INotificationFactory>(FACTORIES.INotificationFactory);

        const emailNotifier = notificationFactory.create('webPush');
        emailNotifier.pushNotification = pushNotification;
        emailNotifier.message = message;

        await emailNotifier.send();
    };
}

export default SendMessageEvent;
