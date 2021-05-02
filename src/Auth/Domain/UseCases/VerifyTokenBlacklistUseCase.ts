import {ITokenRepository} from '@digichanges/shared-experience';

import TokenBlackListedHttpException from '../../Presentation/Exceptions/TokenBlackListedHttpException';
import GetTokenUseCase from './GetTokenUseCase';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';
import ITokenDomain from '../../../App/InterfaceAdapters/ITokenDomain';

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
