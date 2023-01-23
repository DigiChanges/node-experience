import { Query } from 'mongoose';

import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import Token from '../../Domain/Entities/Token';
import ITokenRepository from './ITokenRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import { TokenMongooseDocument } from '../Schemas/TokenMongoose';

class TokenMongooseRepository extends BaseMongooseRepository<ITokenDomain, TokenMongooseDocument> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super(Token.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<TokenMongooseDocument[], TokenMongooseDocument> = this.repository.find();

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default TokenMongooseRepository;
