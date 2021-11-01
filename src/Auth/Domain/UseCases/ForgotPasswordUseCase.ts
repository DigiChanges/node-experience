import { mainConfig } from '../../../Config/mainConfig';
import ForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ForgotPasswordPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import { REPOSITORIES } from '../../../repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import EmailNotification from '../../../Notification/Domain/Entities/EmailNotification';
import ForgotPasswordEvent from '../../../Shared/Events/ForgotPasswordEvent';
import EventHandler from '../../../Shared/Events/EventHandler';

class ForgotPasswordUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ForgotPasswordPayload)
    {
        const user = await this.repository.getOneByEmail(payload.getEmail());

        user.confirmationToken = String(await payload.getConfirmationToken());
        user.passwordRequestedAt = payload.getPasswordRequestedAt();

        await this.repository.save(user);

        const emailNotification = new EmailNotification();

        const urlConfirmationToken = `${mainConfig.url.urlWeb}changeForgotPassword/${user.confirmationToken}`;

        emailNotification.name = 'Forgot Password';
        emailNotification.to = payload.getEmail();
        emailNotification.subject = 'Forgot Password';

        const eventHandler = EventHandler.getInstance();

        await eventHandler.execute(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, { emailNotification, urlConfirmationToken });

        return { message: 'We\'ve sent you an email' };
    }
}

export default ForgotPasswordUseCase;
