import VerifyYourAccountPayload from '../Payloads/VerifyYourAccountPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IUserRepository from '../../../User/Infrastructure/Repositories/IUserRepository';
import SendEmailService from '../../../Notification/Domain/Services/SendEmailService';
import TypeNotificationEnum from '../../../Notification/Domain/Enum/TypeNotificationEnum';
import Locales from '../../../App/Presentation/Shared/Locales';
import VerifiedAccountEvent from '../../../Shared/Events/VerifiedAccountEvent';
import ILocaleMessage from '../../../App/InterfaceAdapters/ILocaleMessage';
import AuthService from '../Services/AuthService';

class VerifyYourAccountUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    private authService = new AuthService();

    async handle(payload: VerifyYourAccountPayload): Promise<ILocaleMessage>
    {
        const { confirmationToken } = payload;

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
