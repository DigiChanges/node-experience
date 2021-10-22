import { ITokenRepository } from '@digichanges/shared-experience';

import TokenBlackListedHttpException from '../../Presentation/Exceptions/TokenBlackListedHttpException';
import GetTokenUseCase from './GetTokenUseCase';
import { REPOSITORIES } from '../../../repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ITokenDomain from '../../../Auth/InterfaceAdapters/ITokenDomain';

class VerifyTokenBlacklistUseCase
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository<ITokenDomain>;

    async handle(tokenId: string)
    {
        const getTokenUseCase = new GetTokenUseCase();
        const tokenSaved: ITokenDomain = await getTokenUseCase.handle(tokenId);

        if (tokenSaved.blackListed)
        {
            throw new TokenBlackListedHttpException();
        }

        return tokenSaved;
    }
}

export default VerifyTokenBlacklistUseCase;
