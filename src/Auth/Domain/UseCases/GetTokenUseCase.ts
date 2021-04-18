import {ITokenRepository} from '@digichanges/shared-experience';

import {REPOSITORIES} from '../../../repositories';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';
import ITokenDomain from '../../../App/InterfaceAdapters/ITokenDomain';

class GetTokenUseCase
{
    private repository: ITokenRepository<ITokenDomain>;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
    }

    async handle(id: string)
    {
        return await this.repository.getOne(id);
    }
}

export default GetTokenUseCase;
