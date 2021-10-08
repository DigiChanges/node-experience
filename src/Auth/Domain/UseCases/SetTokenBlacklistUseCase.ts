import { ITokenRepository } from '@digichanges/shared-experience';

import { REPOSITORIES } from '../../../Config/repositories';
import ITokenDomain from '../../../Auth/InterfaceAdapters/ITokenDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class SetTokenBlacklistUseCase
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository<ITokenDomain>;

    async handle(token: ITokenDomain)
    {
        token.black_listed = true;
        await this.repository.save(token);
    }
}

export default SetTokenBlacklistUseCase;
