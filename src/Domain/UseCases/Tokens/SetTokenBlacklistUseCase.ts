import { lazyInject } from '../../../inversify.config'
import ITokenRepository from "../../../InterfaceAdapters/IRepositories/ITokenRepository";
import {REPOSITORIES} from "../../../repositories";
import ITokenDomain from "../../../InterfaceAdapters/IInfrastructure/ITokenDomain";

class SetTokenBlacklistUseCase
{
    @lazyInject(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository;

    async handle(token: ITokenDomain)
    {
        token.blackListed = true;
        await this.repository.save(token);
    }
}

export default SetTokenBlacklistUseCase;
