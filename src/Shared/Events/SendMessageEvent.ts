import Notificator from '../../Notification/Services/Notificator';

class SendMessageEvent
{
    public static SEND_MESSAGE_EVENT = 'SEND_MESSAGE_EVENT';

    public static sendMessageListener = async(props: any) =>
    {
        const { pushNotification, message } = props;

        setTimeout(() =>
        {
            void Notificator.send_push_notification(pushNotification, message);
        }, 1000);
    }
}

export default SendMessageEvent;
