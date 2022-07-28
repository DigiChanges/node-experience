import { Query } from 'mongoose';
import { ICriteria, IPaginator, ITokenRepository } from '@digichanges/shared-experience';

import MongoosePaginator from '../../../App/Presentation/Shared/Orm/MongoosePaginator';
import ITokenDocument from '../Schemas/ITokenDocument';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';

import BaseMongooseRepository from '../../../App/Infrastructure/Repositories/BaseMongooseRepository';
import Token from '../../Domain/Entities/Token';

class TokenMongooseRepository extends BaseMongooseRepository<ITokenDomain, ITokenDocument> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<ITokenDocument[], ITokenDocument> = this.repository.find();

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default TokenMongooseRepository;
