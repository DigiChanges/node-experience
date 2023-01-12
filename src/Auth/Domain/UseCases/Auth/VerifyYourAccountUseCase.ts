import VerifyYourAccountPayload from '../../Payloads/Auth/VerifyYourAccountPayload';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/IUserRepository';
import SendEmailService from '../../../../Notification/Domain/Services/SendEmailService';
import TypeNotificationEnum from '../../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../../Shared/Presentation/Shared/Locales';
import VerifiedAccountEvent from '../../../../Shared/Infrastructure/Events/VerifiedAccountEvent';
import ILocaleMessage from '../../../../Shared/InterfaceAdapters/ILocaleMessage';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import AuthService from '../../Services/AuthService';

class VerifyYourAccountUseCase
{
    private repository: IUserRepository;
    private authService: AuthService;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.authService = new AuthService();
    }

    async handle(payload: VerifyYourAccountPayload): Promise<ILocaleMessage>
    {
        const confirmationToken = `Bearer ${payload.confirmationToken}`;
        const { email } = this.authService.validateToken(confirmationToken);
        const user = await this.repository.getOneByEmail(email);

        user.verify = true;
        user.enable = true;

        await this.repository.update(user);

        void await SendEmailService.handle({
            event: VerifiedAccountEvent.VERIFIED_ACCOUNT_EVENT,
            type: TypeNotificationEnum.VERIFIED_ACCOUNT,
            to: user.email,
            name: 'Verified account',
            args: {
                userName: user.firstName
            },
            data: {
                EMAIL_USER: user.email
            },
            external: true
        });

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.verifiedAccount';

        return { message: locales.__(key), messageCode: key };
    }
}

export default VerifyYourAccountUseCase;
