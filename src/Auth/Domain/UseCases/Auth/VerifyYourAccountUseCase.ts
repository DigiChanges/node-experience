import VerifyYourAccountPayload from '../../Payloads/Auth/VerifyYourAccountPayload';
import Locales from '../../../../Shared/Presentation/Shared/Locales';
import ILocaleMessage from '../../../../Shared/InterfaceAdapters/ILocaleMessage';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import AuthHelperService from '../../Services/AuthHelperService';
import { REPOSITORIES } from '../../../../Config/Injects';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import IUserDomain from '../../Entities/IUserDomain';
import SendEmailService from '../../../../Notification/Domain/Services/SendEmailService';
import VerifiedAccountEvent from '../../../../Shared/Infrastructure/Events/VerifiedAccountEvent';
import TypeNotificationEnum from '../../../../Notification/Domain/Enum/TypeNotificationEnum';

class VerifyYourAccountUseCase
{
    private authHelperService: AuthHelperService;
    private repository: IAuthRepository;
    private userRepository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
        this.userRepository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.authHelperService = new AuthHelperService();
    }

    async handle(payload: VerifyYourAccountPayload): Promise<ILocaleMessage>
    {
        const { confirmationToken } = payload;

        const { email } = this.authHelperService.validateToken(confirmationToken);

        const user: IUserDomain = await this.userRepository.getOneByEmail(email);

        await this.repository.verifyAccount({ id: user.getId() });

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
