import { Query } from 'mongoose';
import { injectable } from 'inversify';
import { ICriteria, IPaginator, ITokenRepository } from '@digichanges/shared-experience';

import MongoPaginator from '../../../App/Presentation/Shared/MongoPaginator';
import ITokenDocument from '../../InterfaceAdapters/ITokenDocument';
import ITokenDomain from '../../InterfaceAdapters/ITokenDomain';

import BaseMongoRepository from '../../../App/Infrastructure/Repositories/BaseMongoRepository';
import Token from '../../Domain/Entities/Token';

@injectable()
class TokenMongoRepository extends BaseMongoRepository<ITokenDomain, ITokenDocument> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<ITokenDocument[], ITokenDocument> = this.repository.find();

        return new MongoPaginator(queryBuilder, criteria);
    }
}

export default TokenMongoRepository;
