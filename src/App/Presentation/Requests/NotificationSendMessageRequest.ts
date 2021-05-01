import * as express from 'express';
import NotificationSendMessagePayload from '../../../Notification/InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import NotificationSubscriptionRequest from './NotificationCreateSuscriptionRequest';

class NotificationSendMessageRequest extends NotificationSubscriptionRequest implements NotificationSendMessagePayload
{
    private readonly name: string;
    private readonly message: string;

    constructor(request: express.Request)
    {
        super(request);
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
}

export default NotificationSendMessageRequest;
