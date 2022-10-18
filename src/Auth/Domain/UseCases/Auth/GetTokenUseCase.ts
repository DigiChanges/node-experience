import { DependencyContainer } from 'tsyringe';

import { REPOSITORIES } from '../../../../Config/Injects';
import ITokenDomain from '../../Entities/ITokenDomain';
import ITokenRepository from '../../../Infrastructure/Repositories/ITokenRepository';

class GetTokenUseCase
{
    private repository: ITokenRepository<ITokenDomain>;

    constructor(container: DependencyContainer)
    {
        this.repository = container.resolve<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
    }

    async handle(id: string): Promise<ITokenDomain>
    {
        return await this.repository.getOne(id);
    }
}

export default GetTokenUseCase;
