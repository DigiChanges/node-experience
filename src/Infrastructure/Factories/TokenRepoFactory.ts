import {ITokenRepository} from "@digichanges/shared-experience";

import container from "../../inversify.config";
import {REPOSITORIES} from "../../repositories";

class TokenRepoFactory
{
    static create()
    {
        return container.get<ITokenRepository>(REPOSITORIES.ITokenRepository);
    }
}

export default TokenRepoFactory;
