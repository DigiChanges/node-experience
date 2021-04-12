import ForgotPasswordPayload from '../../../InterfaceAdapters/Payloads/Auth/ForgotPasswordPayload';
import IUserRepository from '../../../InterfaceAdapters/IRepositories/IUserRepository';
import Config from 'config';
import {REPOSITORIES} from '../../../repositories';
import EmailNotification from '../../../Infrastructure/Entities/EmailNotification';
import EventHandler from '../../../Infrastructure/Events/EventHandler';
import ForgotPasswordEvent from '../../../Infrastructure/Events/ForgotPasswordEvent';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';

class ForgotPasswordUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: ForgotPasswordPayload)
    {
        const user = await this.repository.getOneByEmail(payload.getEmail());

        user.confirmationToken = String(await payload.getConfirmationToken());
        user.passwordRequestedAt = payload.getPasswordRequestedAT();

        const emailNotification = new EmailNotification();

        const urlConfirmationToken = `${Config.get('url.urlWeb')}'changeForgotPassword/${user.confirmationToken}`;

        emailNotification.name = 'Forgot Password';
        emailNotification.to = payload.getEmail();
        emailNotification.subject = 'Forgot Password';

        const eventHandler = EventHandler.getInstance();

        eventHandler.execute(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, {emailNotification, urlConfirmationToken});

        return {message: 'We\'ve sent you an email'};
    }
}

export default ForgotPasswordUseCase;
