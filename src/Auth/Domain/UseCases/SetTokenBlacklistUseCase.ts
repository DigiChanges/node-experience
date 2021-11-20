import { ITokenRepository } from '@digichanges/shared-experience';

import { REPOSITORIES } from '../../../repositories';
import ITokenDomain from '../../../Auth/InterfaceAdapters/ITokenDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class SetTokenBlacklistUseCase
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository<ITokenDomain>;

    async handle(token: ITokenDomain): Promise<void>
    {
        token.blackListed = true;
        await this.repository.save(token);
    }
}

export default SetTokenBlacklistUseCase;
