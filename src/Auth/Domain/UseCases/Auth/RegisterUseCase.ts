import UserService from '../../Services/UserService';
import SendEmailService from '../../../../Notification/Domain/Services/SendEmailService';
import RegisterEvent from '../../../../Shared/Infrastructure/Events/RegisterEvent';
import TypeNotificationEnum from '../../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../../Shared/Presentation/Shared/Locales';
import RegisterPayload from '../../Payloads/Auth/RegisterPayload';
import ILocaleMessage from '../../../../Shared/InterfaceAdapters/ILocaleMessage';
import MainConfig from '../../../../Config/MainConfig';
import AuthService from '../../Services/AuthService';

class RegisterUseCase
{
    private userService = new UserService();
    private authService = new AuthService();

    constructor()
    {
        this.userService = new UserService();
        this.authService = new AuthService();
    }

    async handle(payload: RegisterPayload): Promise<ILocaleMessage>
    {
        const { urlWeb } = MainConfig.getInstance().getConfig().url;
        const user = await this.userService.create(payload);
        const confirmationToken = this.authService.getConfirmationToken(payload.email);

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
