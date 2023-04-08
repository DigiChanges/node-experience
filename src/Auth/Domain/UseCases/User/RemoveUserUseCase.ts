import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';

class RemoveUserUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveUserUseCase;
