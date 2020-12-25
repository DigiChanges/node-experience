import { lazyInject } from '../../../inversify.config'
import ITokenRepository from "../../../InterfaceAdapters/IRepositories/ITokenRepository";
import {REPOSITORIES} from "../../../repositories";

class GetTokenUseCase
{
    @lazyInject(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository;

    async handle(id: string)
    {
        return await this.repository.getOne(id);
    }
}

export default GetTokenUseCase;
