import BaseMikroORMRepository from '../../../Shared/Infrastructure/Repositories/BaseMikroORMRepository';
import Token from '../../Domain/Entities/Token';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';
import TokenSchema from '../Schemas/TokenMikroORM';
import ITokenRepository from './ITokenRepository';

class TokenMikroORMRepository extends BaseMikroORMRepository<ITokenDomain> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name, TokenSchema);
    }
}

export default TokenMikroORMRepository;
