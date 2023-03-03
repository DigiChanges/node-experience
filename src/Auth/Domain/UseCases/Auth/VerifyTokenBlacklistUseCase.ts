import { DependencyContainer } from 'tsyringe';

import TokenBlackListedHttpException from '../../../Presentation/Exceptions/TokenBlackListedHttpException';
import GetTokenUseCase from './GetTokenUseCase';
import { REPOSITORIES } from '../../../../Config/Injects';
import ITokenDomain from '../../Entities/ITokenDomain';
import ITokenRepository from '../../../Infrastructure/Repositories/ITokenRepository';

class VerifyTokenBlacklistUseCase
{
    private repository: ITokenRepository<ITokenDomain>;
    private readonly container: DependencyContainer;

    constructor(container: DependencyContainer)
    {
        this.repository = container.resolve<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
        this.container = container;
    }

    async handle(tokenId: string): Promise<ITokenDomain>
    {
        const useCase = new GetTokenUseCase(this.container);
        const token: ITokenDomain = await useCase.handle(tokenId);

        if (token.blackListed)
        {
            throw new TokenBlackListedHttpException();
        }

        return token;
    }
}

export default VerifyTokenBlacklistUseCase;
