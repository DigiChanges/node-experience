import ChangeForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeForgotPasswordPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';

import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../repositories';
import Password from '../../../App/Domain/ValueObjects/Password';
import Config from 'config';

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

        const min = Config.get<number>('validationSettings.password.min');
        const max = Config.get<number>('validationSettings.password.max');

        const password = new Password(payload.getPassword(), min, max);
        await password.ready();
        user.password = password;

        await this.repository.update(user);

        // TODO: Add message and code message
        return { message: 'Your password has been changed' };
    }
}

export default ChangeForgotPasswordUseCase;
