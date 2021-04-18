import {Query} from 'mongoose';
import {injectable} from 'inversify';
import {ICriteria, IPaginator, ITokenRepository} from '@digichanges/shared-experience';

import MongoPaginator from '../../../App/Presentation/Shared/MongoPaginator';
import IToken from '../../../App/InterfaceAdapters/ITokenDocument';
import ITokenDomain from '../../../App/InterfaceAdapters/ITokenDomain';

import NotFoundException from '../../../App/Infrastructure/Exceptions/NotFoundException';
import BaseMongoRepository from '../../../App/Infrastructure/Repositories/BaseMongoRepository';

@injectable()
class TokenMongoRepository extends BaseMongoRepository<ITokenDomain, IToken> implements ITokenRepository<ITokenDomain>
{
    constructor()
    {
        super('Token');
    }

    async getOne(id: string): Promise<ITokenDomain>
    {
        const token = await this.repository.findOne({_id: id});

        if (!token)
        {
            throw new NotFoundException('Token');
        }

        return token;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IToken[], IToken> = this.repository.find();

        return new MongoPaginator(queryBuilder, criteria);
    }

    async update(token: ITokenDomain): Promise<ITokenDomain>
    {
        return this.repository.findByIdAndUpdate({_id: token.getId()}, token);
    }

    async delete(id: string): Promise<ITokenDomain>
    {
        const token = await this.repository.findByIdAndDelete({_id: id});

        if (!token)
        {
            throw new NotFoundException('Token');
        }

        return token;
    }
}

export default TokenMongoRepository;
