import {ITokenRepository} from '@digichanges/shared-experience';

import {REPOSITORIES} from '../../../repositories';
import ITokenDomain from '../../../InterfaceAdapters/IInfrastructure/ITokenDomain';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';

class SetTokenBlacklistUseCase
{
    private repository: ITokenRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository>(REPOSITORIES.ITokenRepository);
    }

    async handle(token: ITokenDomain)
    {
        token.blackListed = true;
        await this.repository.save(token);
    }
}

export default SetTokenBlacklistUseCase;
