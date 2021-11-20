import MainConfig from '../../../Config/mainConfig';
import ForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ForgotPasswordPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import { REPOSITORIES } from '../../../repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ForgotPasswordEvent from '../../../Shared/Events/ForgotPasswordEvent';
import SendEmailService from '../../../Notification/Domain/Services/SendEmailService';
import TypeNotificationEnum from '../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../App/Presentation/Shared/Locales';
import ILocaleMessage from '../../../App/InterfaceAdapters/ILocaleMessage';

class ForgotPasswordUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ForgotPasswordPayload): Promise<ILocaleMessage>
    {
        const config = MainConfig.getInstance();
        const user = await this.repository.getOneByEmail(payload.getEmail());

        user.confirmationToken = String(await payload.getConfirmationToken());
        user.passwordRequestedAt = payload.getPasswordRequestedAt();

        await this.repository.save(user);

        const urlConfirmationToken = `${config.getConfig().url.urlWeb}changeForgotPassword/${user.confirmationToken}`;

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
