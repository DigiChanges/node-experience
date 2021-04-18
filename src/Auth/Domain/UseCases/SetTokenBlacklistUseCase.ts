import {ITokenRepository} from '@digichanges/shared-experience';

import {REPOSITORIES} from '../../../repositories';
import ITokenDomain from '../../../App/InterfaceAdapters/ITokenDomain';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class SetTokenBlacklistUseCase
{
    private repository: ITokenRepository<ITokenDomain>;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
    }

    async handle(token: ITokenDomain)
    {
        token.blackListed = true;
        await this.repository.save(token);
    }
}

export default SetTokenBlacklistUseCase;
