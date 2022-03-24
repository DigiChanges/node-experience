import { ITokenRepository } from '@digichanges/shared-experience';
import ILocaleMessage from '../../../App/InterfaceAdapters/ILocaleMessage';
import Locales from '../../../App/Presentation/Shared/Locales';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ITokenDecode from '../../../Shared/InterfaceAdapters/ITokenDecode';
import ITokenDomain from '../Entities/ITokenDomain';
import RefreshTokenPayload from '../Payloads/RefreshTokenPayload';
import AuthService from '../Services/AuthService';
import SetTokenBlacklistUseCase from './SetTokenBlacklistUseCase';

class LogoutUseCase
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private tokenRepository: ITokenRepository<ITokenDomain>;

    private authService = new AuthService();

    async handle(payload: RefreshTokenPayload, tokenDecode: ITokenDecode): Promise<ILocaleMessage>
    {
        const setTokenBlackListUseCase = new SetTokenBlacklistUseCase();

        const tokenId = tokenDecode.id;

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
