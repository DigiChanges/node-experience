import { ITokenRepository } from '@digichanges/shared-experience';
import { injectable } from 'inversify';
import BaseMikroSqlRepository from '../../../App/Infrastructure/Repositories/BaseMikroSqlRepository';
import Token from '../../Domain/Entities/Token';
import ITokenDomain from '../../InterfaceAdapters/ITokenDomain';
import TokenSchema from '../Schemas/TokenMikroORM';

@injectable()
class TokenMikroSqlRepository extends BaseMikroSqlRepository<ITokenDomain> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name, TokenSchema);
    }
}

export default TokenMikroSqlRepository;
