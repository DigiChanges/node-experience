import Config from 'config';
import ForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ForgotPasswordPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import { REPOSITORIES } from '../../../Config/repositories';
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
        const user = await this.repository.get_one_by_email(payload.get_email());

        user.confirmation_token = String(await payload.get_confirmation_token());
        user.password_requested_at = payload.get_password_requested_at();

        await this.repository.save(user);

        const emailNotification = new EmailNotification();

        const urlConfirmationToken = `${Config.get('url.urlWeb')}changeForgotPassword/${user.confirmation_token}`;

        emailNotification.name = 'Forgot Password';
        emailNotification.to = payload.get_email();
        emailNotification.subject = 'Forgot Password';

        const eventHandler = EventHandler.getInstance();

        await eventHandler.execute(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, { emailNotification, urlConfirmationToken });

        return { message: 'We\'ve sent you an email' };
    }
}

export default ForgotPasswordUseCase;
