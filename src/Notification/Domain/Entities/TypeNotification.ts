import webPush from 'web-push';
import Base from '../../../Shared/Domain/Entities/Base';
import TypeEnum from '../Enum/TypeEnum';

class TypeNotification extends Base
{
    name: string;
    emailTemplatePath: string;
    senderName: string;
    from: string;
    to: string;
    cc: string;
    subject: string;
    description: string;
    url: string;
    subscription: webPush.PushSubscription;
    type: TypeEnum;

    constructor()
    {
        super();
        this.cc = null;
        this.name = null;
        this.emailTemplatePath = null;
        this.senderName = null;
        this.from = null;
        this.to = null;
        this.cc = null;
        this.subject = null;
        this.description = null;
        this.type = TypeEnum.EMAIL;
    }

    getSubscription()
    {
        return this.subscription;
    }

    getUrl()
    {
        return this.url;
    }
}

export default TypeNotification;
