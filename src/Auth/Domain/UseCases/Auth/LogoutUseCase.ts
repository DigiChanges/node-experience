import { DependencyContainer } from 'tsyringe';
import ILocaleMessage from '../../../../Shared/InterfaceAdapters/ILocaleMessage';
import Locales from '../../../../Shared/Presentation/Shared/Locales';
import { REPOSITORIES, SERVICES } from '../../../../Config/Injects';
import ITokenDomain from '../../Entities/ITokenDomain';
import RefreshTokenPayload from '../../Payloads/Auth/RefreshTokenPayload';
import AuthService from '../../Services/AuthService';
import SetTokenBlacklistUseCase from './SetTokenBlacklistUseCase';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import ITokenRepository from '../../../Infrastructure/Repositories/ITokenRepository';

class LogoutUseCase
{
    private tokenRepository: ITokenRepository<ITokenDomain>;
    private authService: AuthService;
    private readonly container: DependencyContainer;

    constructor()
    {
        const { container } = getRequestContext();
        this.tokenRepository = container.resolve<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
        this.authService = container.resolve<AuthService>(SERVICES.AuthService);
        this.container = container;
    }

    async handle(payload: RefreshTokenPayload): Promise<ILocaleMessage>
    {
        const setTokenBlackListUseCase = new SetTokenBlacklistUseCase(this.container);

        const tokenId = payload.decodeToken.id;

        const token: ITokenDomain = await this.tokenRepository.getOne(tokenId);

        await setTokenBlackListUseCase.handle(token);

        if (payload.refreshToken)
        {
            const refreshTokenDecode = this.authService.decodeToken(payload.refreshToken, false);

            const refreshToken: ITokenDomain = await this.tokenRepository.getOne(refreshTokenDecode.id);

            await setTokenBlackListUseCase.handle(refreshToken);
        }

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.logout';

        return { message: locales.__(key), messageCode: key };
    }
}

export default LogoutUseCase;
