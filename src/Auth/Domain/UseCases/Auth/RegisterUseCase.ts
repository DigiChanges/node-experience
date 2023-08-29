import SendEmailService from '../../../../Notification/Domain/Services/SendEmailService';
import TypeNotificationEnum from '../../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../../Shared/Utils/Locales';
import RegisterPayload from '../../Payloads/Auth/RegisterPayload';
import { ErrorHttpException, ILocaleMessage, StatusCode } from '@digichanges/shared-experience';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import { REPOSITORIES } from '../../../../Config/Injects';
import MainConfig from '../../../../Config/MainConfig';
import AuthHelperService from '../../Services/AuthHelperService';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import RegisterSchemaValidation from '../../../Presentation/Validations/Auth/RegisterSchemaValidation';

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
        await ValidatorSchema.handle(RegisterSchemaValidation, payload);

        const response = await this.repository.signUp(payload);
        const error = 'User exists with same username';

        if (response?.errorMessage === error)
        {
            // ! Add Custom Exception with mapping on an HttpException
            throw new ErrorHttpException(StatusCode.HTTP_BAD_REQUEST, { message: error });
        }

        const { urlWeb } = MainConfig.getInstance().getConfig().url;
        const confirmationToken = this.authHelperService.getConfirmationToken(payload.email);

        const urlConfirmationToken = `${urlWeb}/auth/verify-your-account?token=${confirmationToken}`;

        void await SendEmailService.handle({
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
            external: true,
            templatePathNameFile: 'auth/register.hbs'
        });

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.register';

        return { message: locales.__(key), messageCode: key };
    }
}

export default RegisterUseCase;
