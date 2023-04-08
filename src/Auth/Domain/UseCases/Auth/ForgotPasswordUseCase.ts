import MainConfig from '../../../../Config/MainConfig';
import ForgotPasswordPayload from '../../Payloads/Auth/ForgotPasswordPayload';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { REPOSITORIES } from '../../../../Config/Injects';
import ForgotPasswordEvent from '../../../../Shared/Infrastructure/Events/ForgotPasswordEvent';
import SendEmailService from '../../../../Notification/Domain/Services/SendEmailService';
import TypeNotificationEnum from '../../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../../Shared/Presentation/Shared/Locales';
import ILocaleMessage from '../../../../Shared/InterfaceAdapters/ILocaleMessage';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import AuthHelperService from '../../Services/AuthHelperService';

class ForgotPasswordUseCase
{
    private repository: IUserRepository;
    private authHelperService: AuthHelperService;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.authHelperService = new AuthHelperService();
    }

    async handle(payload: ForgotPasswordPayload): Promise<ILocaleMessage>
    {
        const { urlWeb } = MainConfig.getInstance().getConfig().url;
        const { email } = payload;
        const user = await this.repository.getOneByEmail(email);

        const confirmationToken = this.authHelperService.getConfirmationToken(payload.email);
        const urlConfirmationToken = `${urlWeb}/change-forgot-password?token=${confirmationToken}`;

        void await SendEmailService.handle({
            event: ForgotPasswordEvent.FORGOT_PASSWORD_EVENT,
            type: TypeNotificationEnum.FORGOT_PASSWORD,
            to: user.email,
            name: 'Forgot password',
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
        const key = 'auth.domain.messages.forgotPassword';

        return { message: locales.__(key), messageCode: key };
    }
}

export default ForgotPasswordUseCase;
