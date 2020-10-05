import NotificationRepPayload from "./NotificationRepPayload";

interface NotificationSendMessagePayload extends NotificationRepPayload
{
    getTitle(): string;
    getMessage(): string;
}

export default NotificationSendMessagePayload