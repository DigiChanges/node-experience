import Notificator from '../Notifications/Notificator';

class SendMessageEvent
{
    public static SEND_MESSAGE_EVENT = 'SEND_MESSAGE_EVENT';

    public static sendMessageListener = (props: any) =>
    {
        const {pushNotification, message} = props;

        Notificator
            .sendPushNotification(pushNotification, message)
            .then((success) => success)
            .catch((error: any) =>
            {
                throw Error('Error To send Web Push Notification');
            });
    }
}

export default SendMessageEvent;