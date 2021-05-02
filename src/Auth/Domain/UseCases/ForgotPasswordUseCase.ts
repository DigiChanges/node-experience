import Config from 'config';
import ForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ForgotPasswordPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import {REPOSITORIES} from '../../../repositories';
import EmailNotification from '../../../App/Infrastructure/Entities/EmailNotification';
import EventHandler from '../../../App/Infrastructure/Events/EventHandler';
import ForgotPasswordEvent from '../../../App/Infrastructure/Events/ForgotPasswordEvent';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';

class ForgotPasswordUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ForgotPasswordPayload)
    {
        const user = await this.repository.getOneByEmail(payload.getEmail());

        user.confirmationToken = String(await payload.getConfirmationToken());
        user.passwordRequestedAt = payload.getPasswordRequestedAT();

        await this.repository.save(user);

        const emailNotification = new EmailNotification();

        const urlConfirmationToken = `${Config.get('url.urlWeb')}changeForgotPassword/${user.confirmationToken}`;

        emailNotification.name = 'Forgot Password';
        emailNotification.to = payload.getEmail();
        emailNotification.subject = 'Forgot Password';

        const eventHandler = EventHandler.getInstance();

        eventHandler.execute(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, {emailNotification, urlConfirmationToken});

        return {message: 'We\'ve sent you an email'};
    }
}

export default ForgotPasswordUseCase;
