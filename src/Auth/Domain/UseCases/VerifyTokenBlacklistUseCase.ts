import {ITokenRepository} from '@digichanges/shared-experience';

import TokenBlackListedHttpException from '../../Presentation/Exceptions/TokenBlackListedHttpException';
import GetTokenUseCase from './GetTokenUseCase';
import Token from '../../../App/Infrastructure/Entities/Token';
import {REPOSITORIES} from '../../../repositories';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';
import ITokenDomain from '../../../App/InterfaceAdapters/ITokenDomain';

class VerifyTokenBlacklistUseCase
{
    private repository: ITokenRepository<ITokenDomain>;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
    }

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
