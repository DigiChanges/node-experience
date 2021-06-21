import * as express from 'express';
import webPush from 'web-push';
import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import NotificationSubscriptionRequest from './NotificationCreateSuscriptionRequest';
import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';


class NotificationSendMessageRequest implements NotificationSendMessagePayload
{
    private readonly name: string;
    private readonly message: string;
    private readonly notificationSubscriptionRequest: NotificationRepPayload;

    constructor(request: express.Request)
    {
        this.notificationSubscriptionRequest = new NotificationSubscriptionRequest(request);
        this.name = request.body.name;
        this.message = request.body.message;
    }

    getName(): string
    {
        return this.name;
    }

    getMessage(): string
    {
        return this.message;
    }

    getSubscription(): webPush.PushSubscription
    {
        return this.notificationSubscriptionRequest.getSubscription();
    }
}

export default NotificationSendMessageRequest;
