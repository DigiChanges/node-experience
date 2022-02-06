
interface IEmailNotificationData
{
    [key: string]: any;
    EMAIL_USER?: string;
    PHONE_USER?: string;
    URL_CONFIRMATION_TOKEN?: string;
}

export default IEmailNotificationData;
