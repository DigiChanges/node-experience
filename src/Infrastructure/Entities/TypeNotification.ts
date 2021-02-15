import webPush from "web-push";
import {TypeNotificationEnum} from "@digichanges/shared-experience";

class TypeNotification
{
    _id: string;
    name: string;
    emailTemplatePath : string;
    senderName: string;
    from: string;
    to: string;
    cc: string;
    subject: string;
    description: string;
    url: string;
    subscription: webPush.PushSubscription;
    type: TypeNotificationEnum;
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this.cc = null;
        this.name = null;
        this.emailTemplatePath = null;
        this.senderName = null;
        this.from = null;
        this.to = null;
        this.cc = null;
        this.subject = null;
        this.description = null;
        this.type = TypeNotificationEnum.EMAIL
    }

    getSubscription()
    {
        return this.subscription;
    }

    getUrl()
    {
        return this.url;
    }

    getId(): string
    {
        return this._id;
    }
}

export default TypeNotification;