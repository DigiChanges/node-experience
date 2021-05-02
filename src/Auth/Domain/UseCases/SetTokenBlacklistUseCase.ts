import {ITokenRepository} from '@digichanges/shared-experience';

import {REPOSITORIES} from '../../../repositories';
import ITokenDomain from '../../../App/InterfaceAdapters/ITokenDomain';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';

class SetTokenBlacklistUseCase
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository<ITokenDomain>;

    async handle(token: ITokenDomain)
    {
        token.blackListed = true;
        await this.repository.save(token);
    }
}

export default SetTokenBlacklistUseCase;
