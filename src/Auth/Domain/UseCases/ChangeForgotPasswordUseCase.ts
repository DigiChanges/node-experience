import ChangeForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeForgotPasswordPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';

import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/repositories';

class ChangeForgotPasswordUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ChangeForgotPasswordPayload)
    {
        const confirmation_token = payload.get_confirmation_token();

        const user = await this.repository.get_one_by_confirmation_token(confirmation_token);
        user.confirmation_token = null;
        user.password_requested_at = null;
        user.password = await payload.get_password();

        await this.repository.update(user);

        return { message: 'Your password has been changed' };
    }
}

export default ChangeForgotPasswordUseCase;
