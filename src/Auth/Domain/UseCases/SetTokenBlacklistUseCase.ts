import { ITokenRepository } from '@digichanges/shared-experience';

import { REPOSITORIES } from '../../../Config/Injects';
import ITokenDomain from '../Entities/ITokenDomain';
import { DependencyContainer } from 'tsyringe';

class SetTokenBlacklistUseCase
{
    private repository: ITokenRepository<ITokenDomain>;

    constructor(container: DependencyContainer)
    {
        this.repository = container.resolve<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
    }
    async handle(token: ITokenDomain): Promise<void>
    {
        token.blackListed = true;
        await this.repository.save(token);
    }
}

export default SetTokenBlacklistUseCase;
