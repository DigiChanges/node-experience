import UserUpdatePayload from '../../Payloads/User/UserUpdatePayload';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';

class UpdateUserUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        const { id } = payload;
        const user: IUserDomain = await this.repository.getOne(payload.id);
        payload.enable = payload.userId === user.getId() ?? payload.enable;

        user.updateRep(payload);
        await this.repository.update(user);

        return user;
    }
}

export default UpdateUserUseCase;
