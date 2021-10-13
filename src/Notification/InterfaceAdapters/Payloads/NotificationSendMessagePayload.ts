import NotificationRepPayload from './NotificationRepPayload';

interface NotificationSendMessagePayload extends NotificationRepPayload
{
    get_name(): string;
    get_message(): string;
}

export default NotificationSendMessagePayload;
