import { lazyInject } from '../../../inversify.config'
import ChangeForgotPasswordPayload from "../../../InterfaceAdapters/Payloads/Auth/ChangeForgotPasswordPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";

class ChangeForgotPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ChangeForgotPasswordPayload)
    {
        const confirmationToken = payload.confirmationToken();

        const user = await this.repository.getOneByConfirmationToken(confirmationToken);
        user.confirmationToken = null;
        user.passwordRequestedAt = null;
        user.password = await payload.password();

        await this.repository.update(user);

        return {message: "Your password has been changed"};
    }
}

export default ChangeForgotPasswordUseCase;
