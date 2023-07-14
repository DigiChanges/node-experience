import { FACTORIES } from '../../../Config/Injects';
import NotifierFactory from '../../Shared/NotifierFactory';
import { IEvent } from '@digichanges/shared-experience';

class SendMessageEvent implements IEvent
{
    public name = SendMessageEvent.name;

    public handle = async(props: any) =>
    {
        const { pushNotification, message } =  props;

        const webPushNotifier: any = NotifierFactory.create(FACTORIES.WebPushStrategy);

        webPushNotifier.pushNotification = pushNotification;
        webPushNotifier.message = message;

        await webPushNotifier.send();
    };
}

export default SendMessageEvent;
