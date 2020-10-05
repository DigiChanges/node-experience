import PushNotification from '../../../Infrastructure/Entities/PushNotification';
import EventHandler from '../../../Infrastructure/Events/EventHandler';
import SendMessageEvent from '../../../Infrastructure/Events/SendMessageEvent';
import { lazyInject } from '../../../inversify.config';
import NotificationSendMessageRequest from '../../../Presentation/Requests/Handler/Notification/NotificationSendMessageRequest';
import { REPOSITORIES } from '../../../repositories';


class SendPushNotificationUseCase
{
    // @lazyInject(REPOSITORIES.IFileRepository)
    // private repository: IFileRepository;

    async handle(payload: NotificationSendMessageRequest): Promise<any>
    {

        const pushNotification = new PushNotification();
        pushNotification.subscription = payload.getSubscription();

        pushNotification.title = payload.getTitle();

        const eventHandler = EventHandler.getInstance();
        const message = payload.getMessage();
        eventHandler.execute(SendMessageEvent.SEND_MESSAGE_EVENT, {pushNotification, message});

        return {message: "We've sent you a notification"};
    }
}

export default SendPushNotificationUseCase;