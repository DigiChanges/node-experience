import { REPOSITORIES } from '../../../../Config/Injects';

import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';

class MeUseCase
{
    private readonly repository: IAuthRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
    }

    async handle(payload: any): Promise<any>
    {
        const { token } = payload;
        return this.repository.me({ token });
    }
}

export default MeUseCase;
