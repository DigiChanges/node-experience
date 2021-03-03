import {ITokenRepository} from "@digichanges/shared-experience";

import TokenBlackListedHttpException from "../../../Presentation/Exceptions/TokenBlackListedHttpException";
import GetTokenUseCase from "./GetTokenUseCase";
import Token from "../../../Infrastructure/Entities/Token";
import {REPOSITORIES} from "../../../repositories";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class VerifyTokenBlacklistUseCase
{
    private repository: ITokenRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository>(REPOSITORIES.ITokenRepository);
    }

    async handle(tokenId: string)
    {
        const getTokenUseCase = new GetTokenUseCase();
        const tokenSaved: Token = await getTokenUseCase.handle(tokenId);

        if (tokenSaved.blackListed)
        {
            throw new TokenBlackListedHttpException();
        }

        return tokenSaved;
    }
}

export default VerifyTokenBlacklistUseCase;
