import UserService from '../../../User/Domain/Services/UserService';
import SendEmailService from '../../../Notification/Domain/Services/SendEmailService';
import RegisterEvent from '../../../Shared/Events/RegisterEvent';
import TypeNotificationEnum from '../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../App/Presentation/Shared/Locales';
import RegisterPayload from '../Payloads/RegisterPayload';
import ILocaleMessage from '../../../App/InterfaceAdapters/ILocaleMessage';
import MainConfig from '../../../Config/mainConfig';

class RegisterUseCase
{
    private userService = new UserService();

    async handle(payload: RegisterPayload): Promise<ILocaleMessage>
    {
        const { urlWeb } = MainConfig.getInstance().getConfig().url;
        const user = await this.userService.create(payload);

        const confirmationToken = payload.confirmationToken;

        const urlConfirmationToken = `${urlWeb}/verify-your-account?token=${confirmationToken}`;

        void await SendEmailService.handle({
            event: RegisterEvent.REGISTER_EVENT,
            type: TypeNotificationEnum.VERIFY_ACCOUNT,
            to: user.email,
            name: 'Verify your account',
            args: {
                urlConfirmationToken,
                userName: user.firstName
            },
            data: {
                EMAIL_USER: user.email,
                URL_CONFIRMATION_TOKEN: urlConfirmationToken
            },
            external: true
        });

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.register';

        return { message: locales.__(key), messageCode: key };
    }
}

export default RegisterUseCase;
