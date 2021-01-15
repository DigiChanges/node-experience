import { lazyInject } from '../../../inversify.config'
import KeepAlivePayload from "../../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import TokenFactory from "../../../Infrastructure/Factories/TokenFactory";
import {REPOSITORIES} from "../../../repositories";
import ITokenRepository from "../../../InterfaceAdapters/IRepositories/ITokenRepository";
import SetTokenBlacklistUseCase from "../Tokens/SetTokenBlacklistUseCase";

class KeepAliveUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @lazyInject(REPOSITORIES.ITokenRepository)
    private tokenRepository: ITokenRepository;

    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
    }

    async handle(payload: KeepAlivePayload)
    {
        const email = payload.getEmail();
        const tokenId = payload.getTokenId()

        const user = await this.repository.getOneByEmail(email);
        const token: any = await this.tokenRepository.getOne(tokenId);

        const setTokenBlacklistUseCase = new SetTokenBlacklistUseCase();
        await setTokenBlacklistUseCase.handle(token);

        return await this.tokenFactory.createToken(user);
    }
}

export default KeepAliveUseCase;
