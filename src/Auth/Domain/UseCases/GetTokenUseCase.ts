import { DependencyContainer } from 'tsyringe';
import { ITokenRepository } from '@digichanges/shared-experience';

import { REPOSITORIES } from '../../../Config/Injects';
import ITokenDomain from '../Entities/ITokenDomain';

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
