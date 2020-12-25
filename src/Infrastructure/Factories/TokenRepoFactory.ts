import container from "../../inversify.config";
import ITokenRepository from "../../InterfaceAdapters/IRepositories/ITokenRepository";
import {REPOSITORIES} from "../../repositories";

class TokenRepoFactory
{
    static create()
    {
        return container.get<ITokenRepository>(REPOSITORIES.ITokenRepository);
    }
}

export default TokenRepoFactory;
