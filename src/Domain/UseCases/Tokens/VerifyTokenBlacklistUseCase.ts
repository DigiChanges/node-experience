import TokenBlackListedHttpException from "../../../Presentation/Exceptions/TokenBlackListedHttpException";
import GetTokenUseCase from "./GetTokenUseCase";
import Token from "../../../Infrastructure/Entities/Token";
import { lazyInject } from "../../../inversify.config";
import {REPOSITORIES} from "../../../repositories";
import ITokenRepository from "../../../InterfaceAdapters/IRepositories/ITokenRepository";

class VerifyTokenBlacklistUseCase
{
    @lazyInject(REPOSITORIES.ITokenRepository)
    private tokenRepository: ITokenRepository;

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
