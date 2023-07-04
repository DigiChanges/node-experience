import UserActivePayload from '../../Payloads/User/UserActivePayload';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import IUserDomain from '../../Entities/IUserDomain';

class ActiveUserByEmailUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: UserActivePayload): Promise<IUserDomain>
    {
        const { email } = payload;
        const user = await this.repository.getOneByEmail(email);

        await this.repository.active(user);

        return user;
    }
}

export default ActiveUserByEmailUseCase;
