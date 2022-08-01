import BaseTypeORMRepository from '../../../Shared/Infrastructure/Repositories/BaseTypeORMRepository';
import Token from '../../Domain/Entities/Token';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';
import TokenSchema from '../Schemas/TokenTypeORM';
import ITokenRepository from './ITokenRepository';

class TokenTypeORMRepository extends BaseTypeORMRepository<ITokenDomain> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name, TokenSchema);
    }
}

export default TokenTypeORMRepository;
