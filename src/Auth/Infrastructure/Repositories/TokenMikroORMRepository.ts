import { ITokenRepository } from '@digichanges/shared-experience';
import { injectable } from 'inversify';
import BaseMikroORMRepository from '../../../App/Infrastructure/Repositories/BaseMikroORMRepository';
import Token from '../../Domain/Entities/Token';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';
import TokenSchema from '../Schemas/TokenMikroORM';

@injectable()
class TokenMikroORMRepository extends BaseMikroORMRepository<ITokenDomain> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name, TokenSchema);
    }
}

export default TokenMikroORMRepository;
