import {ITokenRepository} from "@digichanges/shared-experience";

import {REPOSITORIES} from "../../../repositories";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class GetTokenUseCase
{
    private repository: ITokenRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository>(REPOSITORIES.ITokenRepository);
    }

    async handle(id: string)
    {
        return await this.repository.getOne(id);
    }
}

export default GetTokenUseCase;
