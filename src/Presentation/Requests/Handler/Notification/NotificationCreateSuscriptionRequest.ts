import * as express from "express";
import webPush from "web-push";
import NotificationRepPayload from "../../../../InterfaceAdapters/Payloads/Notifications/NotificationRepPayload";

class NotificationSuscriptionRequest implements NotificationRepPayload
{
    private readonly subscription: webPush.PushSubscription;

    constructor(request: express.Request)
    {
        this.subscription = request.body.subscription;
    }

    getSubscription(): webPush.PushSubscription
    {
        return this.subscription;
    }
}

export default NotificationSuscriptionRequest;