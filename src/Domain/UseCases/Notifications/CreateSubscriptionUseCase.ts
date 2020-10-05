import PushNotification from '../../../Infrastructure/Entities/PushNotification';
import EventHandler from '../../../Infrastructure/Events/EventHandler';
import SendMessageEvent from '../../../Infrastructure/Events/SendMessageEvent';
import NotificationRepPayload from '../../../InterfaceAdapters/Payloads/Notifications/NotificationRepPayload';
import { lazyInject } from '../../../inversify.config';
import { REPOSITORIES } from '../../../repositories';


class CreateSubscriptionUseCase
{
    // @lazyInject(REPOSITORIES.IFileRepository)
    // private repository: IFileRepository;

    async handle(payload: NotificationRepPayload): Promise<any>
    {
        const pushNotification = new PushNotification();

        pushNotification.subscription = payload.getSubscription();
        pushNotification.title = "Node Experience";

        const eventHandler = EventHandler.getInstance();
        const message = "successful subscription";
        eventHandler.execute(SendMessageEvent.SEND_MESSAGE_EVENT, {pushNotification, message});

        return {message: "We've sent you a notification"};
    }
}

export default CreateSubscriptionUseCase;