import ITokenDecode from '../../../Shared/InterfaceAdapters/ITokenDecode';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { ITokenRepository } from '@digichanges/shared-experience';
import ITokenDomain from '../Entities/ITokenDomain';
import SetTokenBlacklistUseCase from './SetTokenBlacklistUseCase';
import Locales from '../../../App/Presentation/Shared/Locales';
import ILocaleMessage from '../../../App/InterfaceAdapters/ILocaleMessage';

class LogoutUseCase
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private tokenRepository: ITokenRepository<ITokenDomain>;

    async handle(tokenDecode: ITokenDecode): Promise<ILocaleMessage>
    {
        const tokenId = tokenDecode.id;

        const token: ITokenDomain = await this.tokenRepository.getOne(tokenId);

        const useCase = new SetTokenBlacklistUseCase();
        await useCase.handle(token);

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.logout';

        return { message: locales.__(key), messageCode: key };
    }
}

export default LogoutUseCase;
