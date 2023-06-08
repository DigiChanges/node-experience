import { REPOSITORIES } from '../../../../Config/Injects';

import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';
import IUserDomain from '../../Entities/IUserDomain';

class MeUseCase
{
    private readonly repository: IAuthRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
    }

    async handle(payload: { token: string }): Promise<IUserDomain>
    {
        const { token } = payload;
        return this.repository.me({ token });
    }
}

export default MeUseCase;
