import SendEmailService from '../Services/SendEmailService';
import TypeNotificationEnum from '../Enum/TypeNotificationEnum';

class NotificationEmailUseCase
{
    async handle(content: { email: string }): Promise<void>
    {
        await SendEmailService.handle({
            type: TypeNotificationEnum.NOTIFICATION_EXAMPLE,
            args: {},
            name: TypeNotificationEnum.NOTIFICATION_EXAMPLE,
            to: content.email,
            templatePathNameFile: 'auth/notificationExample.hbs'
        });
    }
}

export default NotificationEmailUseCase;
