import TokenFactory from '../../../Shared/Factories/TokenFactory';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import UserService from '../../../User/Domain/Services/UserService';
import EventHandler from '../../../Shared/Events/EventHandler';
import SendEmailService from '../../../Notification/Domain/Services/SendEmailService';
import RegisterEvent from '../../../Shared/Events/RegisterEvent';
import Config from 'config';
import TypeNotificationEnum from '../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../App/Presentation/Shared/Locales';
import RegisterPayload from '../../InterfaceAdapters/Payloads/RegisterPayload';
import ILocaleMessage from '../../../App/InterfaceAdapters/ILocaleMessage';

class RegisterUseCase
{
    private userService = new UserService();

    private encryption = EncryptionFactory.create();

    private tokenFactory = new TokenFactory();

    private eventHandler = EventHandler.getInstance();

    async handle(payload: RegisterPayload): Promise<ILocaleMessage>
    {
        const user = await this.userService.create(payload);

        const urlConfirmationToken = `${Config.get('url.urlWeb')}verify-your-account/${user.confirmationToken}`;

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
