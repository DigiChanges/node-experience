import { ITokenRepository } from '@digichanges/shared-experience';
import { injectable } from 'inversify';
import BaseTypeORMRepository from '../../../App/Infrastructure/Repositories/BaseTypeORMRepository';
import Token from '../../Domain/Entities/Token';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';
import TokenSchema from '../Schemas/TokenTypeORM';

@injectable()
class TokenTypeORMRepository extends BaseTypeORMRepository<ITokenDomain> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name, TokenSchema);
    }
}

export default TokenTypeORMRepository;
