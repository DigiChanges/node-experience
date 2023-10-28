import MainConfig from '../../../../Config/MainConfig';
import ForgotPasswordPayload from '../../Payloads/Auth/ForgotPasswordPayload';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { REPOSITORIES } from '../../../../Config/Injects';
import SendEmailService from '../../../../Notification/Domain/Services/SendEmailService';
import TypeNotificationEnum from '../../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../../Shared/Utils/Locales';
import { ILocaleMessage } from '@digichanges/shared-experience';
import container from '../../../../register';
import AuthHelperService from '../../Services/AuthHelperService';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import ForgotPasswordSchemaValidation from '../../../Presentation/Validations/Auth/ForgotPasswordSchemaValidation';

class ForgotPasswordUseCase
{
    private repository: IUserRepository;
    private authHelperService: AuthHelperService;

    constructor()
    {
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.authHelperService = new AuthHelperService();
    }

    async handle(payload: ForgotPasswordPayload): Promise<ILocaleMessage>
    {
        await ValidatorSchema.handle(ForgotPasswordSchemaValidation, payload);

        const { urlWeb } = MainConfig.getInstance().getConfig().url;
        const { email } = payload;
        const user = await this.repository.getOneByEmail(email);

        const confirmationToken = this.authHelperService.getConfirmationToken(payload.email);
        const urlConfirmationToken = `${urlWeb}/auth/change-forgot-password?token=${confirmationToken}`;

        void await SendEmailService.handle({
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
            external: true,
            templatePathNameFile: 'auth/forgotPassword.hbs'
        });

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.forgotPassword';

        return { message: locales.__(key), messageCode: key };
    }
}

export default ForgotPasswordUseCase;
