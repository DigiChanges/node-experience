import {ITokenRepository} from "@digichanges/shared-experience";

import { lazyInject } from '../../../inversify.config'
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
