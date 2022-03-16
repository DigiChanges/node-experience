import { ITokenRepository } from '@digichanges/shared-experience';

import TokenBlackListedHttpException from '../../Presentation/Exceptions/TokenBlackListedHttpException';
import GetTokenUseCase from './GetTokenUseCase';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ITokenDomain from '../Entities/ITokenDomain';

class VerifyTokenBlacklistUseCase
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository<ITokenDomain>;

    async handle(tokenId: string): Promise<ITokenDomain>
    {
        const useCase = new GetTokenUseCase();
        const token: ITokenDomain = await useCase.handle(tokenId);

        if (token.blackListed)
        {
            throw new TokenBlackListedHttpException();
        }

        return token;
    }
}

export default VerifyTokenBlacklistUseCase;
