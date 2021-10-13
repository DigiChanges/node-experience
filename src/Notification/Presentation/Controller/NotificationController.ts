import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';
import CreateSubscriptionUseCase from '../../Domain/UseCases/CreateSubscriptionUseCase';
import SendPushNotificationUseCase from '../../Domain/UseCases/SendPushNotificationUseCase';


class NotificationController
{
    public async upload_test_notification_base64(request: NotificationRepPayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new CreateSubscriptionUseCase();
        return use_case.handle(request);
    }

    public async send_push_notification(request: NotificationSendMessagePayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new SendPushNotificationUseCase();
        return use_case.handle(request);
    }
}

export default NotificationController;
