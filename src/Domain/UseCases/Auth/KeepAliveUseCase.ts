import {ITokenRepository} from '@digichanges/shared-experience';
import KeepAlivePayload from '../../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload';
import IUserRepository from '../../../InterfaceAdapters/IRepositories/IUserRepository';
import TokenFactory from '../../../Infrastructure/Factories/TokenFactory';
import {REPOSITORIES} from '../../../repositories';
import SetTokenBlacklistUseCase from '../Tokens/SetTokenBlacklistUseCase';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';

class KeepAliveUseCase
{
    private repository: IUserRepository;
    private tokenRepository: ITokenRepository;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.tokenRepository = ContainerFactory.create<ITokenRepository>(REPOSITORIES.ITokenRepository);
    }

    async handle(payload: KeepAlivePayload)
    {
        const email = payload.getEmail();
        const tokenId = payload.getTokenId();

        const user = await this.repository.getOneByEmail(email);
        const token: any = await this.tokenRepository.getOne(tokenId);

        const setTokenBlacklistUseCase = new SetTokenBlacklistUseCase();
        await setTokenBlacklistUseCase.handle(token);

        return await this.tokenFactory.createToken(user);
    }
}

export default KeepAliveUseCase;
