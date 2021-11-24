import { ITokenRepository } from '@digichanges/shared-experience';
import RefreshTokenPayload from '../../InterfaceAdapters/Payloads/RefreshTokenPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import TokenFactory from '../../../Shared/Factories/TokenFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import SetTokenBlacklistUseCase from './SetTokenBlacklistUseCase';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ITokenDomain from '../../../Auth/InterfaceAdapters/ITokenDomain';
import IToken from '../../InterfaceAdapters/IToken';
import AuthService from '../Services/AuthService';

class RefreshTokenUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.ITokenRepository)
    private tokenRepository: ITokenRepository<ITokenDomain>;

    private authService = new AuthService();

    private tokenFactory = new TokenFactory();

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
