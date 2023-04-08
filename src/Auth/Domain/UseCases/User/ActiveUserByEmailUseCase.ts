import UserActivePayload from '../../Payloads/User/UserActivePayload';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';

class ActiveUserByEmailUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: UserActivePayload): Promise<void>
    {
        const { email } = payload;
        const user = await this.repository.getOneByEmail(email);

        await this.repository.active(user);
    }
}

export default ActiveUserByEmailUseCase;
