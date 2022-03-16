import { ITokenRepository } from '@digichanges/shared-experience';
import { injectable } from 'inversify';
import BaseSqlRepository from '../../../App/Infrastructure/Repositories/BaseSqlRepository';
import Token from '../../Domain/Entities/Token';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';
import TokenSchema from '../Schemas/TokenTypeORM';

@injectable()
class TokenSqlRepository extends BaseSqlRepository<ITokenDomain> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name, TokenSchema);
    }
}

export default TokenSqlRepository;
