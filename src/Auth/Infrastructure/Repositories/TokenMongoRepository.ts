import {Query} from 'mongoose';
import {injectable} from 'inversify';
import {ICriteria, IPaginator, ITokenRepository} from '@digichanges/shared-experience';

import MongoPaginator from '../../../App/Presentation/Shared/MongoPaginator';
import IToken from '../../InterfaceAdapters/ITokenDocument';
import ITokenDomain from '../../InterfaceAdapters/ITokenDomain';

import BaseMongoRepository from '../../../App/Infrastructure/Repositories/BaseMongoRepository';
import Token from '../../Domain/Entities/Token';

@injectable()
class TokenMongoRepository extends BaseMongoRepository<ITokenDomain, IToken> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IToken[], IToken> = this.repository.find();

        return new MongoPaginator(queryBuilder, criteria);
    }
}

export default TokenMongoRepository;
