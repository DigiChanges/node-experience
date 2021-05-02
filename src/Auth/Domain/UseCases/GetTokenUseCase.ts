import {ITokenRepository} from '@digichanges/shared-experience';

import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';
import ITokenDomain from '../../../App/InterfaceAdapters/ITokenDomain';

class GetTokenUseCase
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository<ITokenDomain>;

    async handle(id: string)
    {
        return await this.repository.getOne(id);
    }
}

export default GetTokenUseCase;
