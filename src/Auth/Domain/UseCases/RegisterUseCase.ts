import { IEncryption } from '@digichanges/shared-experience';
import TokenFactory from '../../../Shared/Factories/TokenFactory';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import UserService from '../../../User/Domain/Services/UserService';
import EventHandler from '../../../Shared/Events/EventHandler';
import IToken from '../../InterfaceAdapters/IToken';
import UserSavePayload from '../../../User/InterfaceAdapters/Payloads/UserSavePayload';
import UserCreatedEvent from '../../../Shared/Events/UserCreatedEvent';
import SendEmailService from '../../../Notification/Domain/Services/SendEmailService';
import RegisterEvent from '../../../Shared/Events/RegisterEvent';
import Config from 'config';
import TypeNotificationEnum from '../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../App/Presentation/Shared/Locales';

class RegisterUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: UserService;
    private encryption: IEncryption;
    private tokenFactory: TokenFactory;
    private eventHandler: EventHandler;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
        this.eventHandler = EventHandler.getInstance();
    }

    async handle(payload: UserSavePayload): Promise<Record<string, string>>
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
