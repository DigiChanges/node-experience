import ChangeForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeForgotPasswordPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';

class ChangeForgotPasswordUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ChangeForgotPasswordPayload)
    {
        const confirmationToken = payload.getConfirmationToken();

        const user = await this.repository.getOneByConfirmationToken(confirmationToken);
        user.confirmationToken = null;
        user.passwordRequestedAt = null;
        user.password = await payload.getPassword();

        await this.repository.update(user);

        return {message: 'Your password has been changed'};
    }
}

export default ChangeForgotPasswordUseCase;
