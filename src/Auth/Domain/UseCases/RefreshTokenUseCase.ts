import { ITokenRepository } from '@digichanges/shared-experience';
import RefreshTokenPayload from '../../InterfaceAdapters/Payloads/RefreshTokenPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import TokenFactory from '../../../Shared/Factories/TokenFactory';
import { REPOSITORIES } from '../../../repositories';
import SetTokenBlacklistUseCase from './SetTokenBlacklistUseCase';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ITokenDomain from '../../../Auth/InterfaceAdapters/ITokenDomain';
import { SERVICES } from '../../../services';
import IAuthService from '../../InterfaceAdapters/IAuthService';
import IToken from '../../InterfaceAdapters/IToken';

class RefreshTokenUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.ITokenRepository)
    private tokenRepository: ITokenRepository<ITokenDomain>;

    @containerFactory(SERVICES.IAuthService)
    private authService: IAuthService;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
    }

    async handle(payload: RefreshTokenPayload): Promise<IToken>
    {
        const tokenDecode = this.authService.decodeToken(payload.getRefreshToken(), false);

        const email = tokenDecode.email;
        const tokenId = tokenDecode.id;

        const user = await this.repository.getOneByEmail(email);
        const token: ITokenDomain = await this.tokenRepository.getOne(tokenId);

        const useCase = new SetTokenBlacklistUseCase();
        await useCase.handle(token);

        return await this.tokenFactory.createToken(user);
    }
}

export default RefreshTokenUseCase;
