import * as express from "express";
import NotificationSendMessagePayload from "../../../../InterfaceAdapters/Payloads/Notifications/NotificationSendMessagePayload";
import NotificationSuscriptionRequest from "./NotificationCreateSuscriptionRequest";

class NotificationSendMessageRequest extends NotificationSuscriptionRequest implements NotificationSendMessagePayload
{
    private title: string;
    private message: string;

    constructor(request: express.Request) {
        super(request);
        this.title = request.body.title;
        this.message = request.body.message;
    }
    
    getTitle(): string {
        return this.title;
    }
    
    getMessage(): string {
        return this.message;
    }
}

export default NotificationSendMessageRequest;