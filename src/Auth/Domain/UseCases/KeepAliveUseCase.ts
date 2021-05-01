import {ITokenRepository} from '@digichanges/shared-experience';
import KeepAlivePayload from '../../InterfaceAdapters/Payloads/KeepAlivePayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import TokenFactory from '../../../Shared/Factories/TokenFactory';
import {REPOSITORIES} from '../../../repositories';
import SetTokenBlacklistUseCase from './SetTokenBlacklistUseCase';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import ITokenDomain from '../../../Auth/InterfaceAdapters/ITokenDomain';

class KeepAliveUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.ITokenRepository)
    private tokenRepository: ITokenRepository<ITokenDomain>;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
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
