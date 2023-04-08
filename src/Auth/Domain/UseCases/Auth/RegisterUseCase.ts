import SendEmailService from '../../../../Notification/Domain/Services/SendEmailService';
import RegisterEvent from '../../../../Shared/Infrastructure/Events/RegisterEvent';
import TypeNotificationEnum from '../../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../../Shared/Presentation/Shared/Locales';
import RegisterPayload from '../../Payloads/Auth/RegisterPayload';
import ILocaleMessage from '../../../../Shared/InterfaceAdapters/ILocaleMessage';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import { REPOSITORIES } from '../../../../Config/Injects';
import ErrorHttpException from '../../../../Shared/Presentation/Shared/ErrorHttpException';
import MainConfig from '../../../../Config/MainConfig';
import AuthHelperService from '../../Services/AuthHelperService';

class RegisterUseCase
{
    private repository: IAuthRepository;
    private authHelperService: AuthHelperService;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
        this.authHelperService = new AuthHelperService();
    }

    async handle(payload: RegisterPayload): Promise<ILocaleMessage>
    {
        const statusCode = MainConfig.getInstance().getConfig().statusCode;
        const response = await this.repository.signUp(payload);
        const error = 'User exists with same username';

        if (response?.errorMessage === error)
        {
            // ! Add Custom Exception with mapping on an HttpException
            throw new ErrorHttpException(statusCode['HTTP_CONFLICT'], { message: error });
        }

        const { urlWeb } = MainConfig.getInstance().getConfig().url;
        const confirmationToken = this.authHelperService.getConfirmationToken(payload.email);

        const urlConfirmationToken = `${urlWeb}/verify-your-account?token=${confirmationToken}`;

        void await SendEmailService.handle({
            event: RegisterEvent.REGISTER_EVENT,
            type: TypeNotificationEnum.VERIFY_ACCOUNT,
            to: payload.email,
            name: 'Verify your account',
            args: {
                urlConfirmationToken,
                userName: payload.firstName
            },
            data: {
                EMAIL_USER: payload.email,
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
