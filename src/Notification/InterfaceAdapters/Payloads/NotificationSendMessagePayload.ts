import NotificationRepPayload from './NotificationRepPayload';

interface NotificationSendMessagePayload extends NotificationRepPayload
{
    getName(): string;
    getMessage(): string;
}

export default NotificationSendMessagePayload;
