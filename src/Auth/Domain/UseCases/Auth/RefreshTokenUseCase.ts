import RefreshTokenPayload from '../../Payloads/Auth/RefreshTokenPayload';
import IUserRepository from '../../../Infrastructure/Repositories/IUserRepository';
import TokenFactory from '../../../../Shared/Factories/TokenFactory';
import { REPOSITORIES, SERVICES } from '../../../../Config/Injects';
import SetTokenBlacklistUseCase from './SetTokenBlacklistUseCase';
import ITokenDomain from '../../Entities/ITokenDomain';
import IToken from '../../Models/IToken';
import AuthService from '../../Services/AuthService';
import { DependencyContainer } from 'tsyringe';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import ITokenRepository from '../../../Infrastructure/Repositories/ITokenRepository';

class RefreshTokenUseCase
{
    private repository: IUserRepository;
    private tokenRepository: ITokenRepository<ITokenDomain>;
    private authService: AuthService;
    private tokenFactory: TokenFactory;
    private readonly container: DependencyContainer;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.tokenRepository = container.resolve<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
        this.authService = container.resolve<AuthService>(SERVICES.AuthService);
        this.tokenFactory = new TokenFactory();
        this.container = container;
    }

    async handle(payload: RefreshTokenPayload): Promise<IToken>
    {
        const tokenDecode = this.authService.decodeToken(payload.refreshToken, false);

        const email = tokenDecode.email;
        const tokenId = tokenDecode.id;

        const user = await this.repository.getOneByEmail(email);
        const token: ITokenDomain = await this.tokenRepository.getOne(tokenId);

        const useCase = new SetTokenBlacklistUseCase(this.container);
        await useCase.handle(token);

        return await this.tokenFactory.createToken(user);
    }
}

export default RefreshTokenUseCase;
