import {ITokenRepository} from '@digichanges/shared-experience';
import KeepAlivePayload from '../../InterfaceAdapters/Payloads/KeepAlivePayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import TokenFactory from '../../../App/Infrastructure/Factories/TokenFactory';
import {REPOSITORIES} from '../../../repositories';
import SetTokenBlacklistUseCase from './SetTokenBlacklistUseCase';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';
import ITokenDomain from '../../../App/InterfaceAdapters/ITokenDomain';

class KeepAliveUseCase
{
    private repository: IUserRepository;
    private tokenRepository: ITokenRepository<ITokenDomain>;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.tokenRepository = ContainerFactory.create<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
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
