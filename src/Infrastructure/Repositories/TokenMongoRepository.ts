import {Query, Model} from 'mongoose';
import {injectable} from 'inversify';
import {ICriteria, IPaginator, ITokenRepository} from '@digichanges/shared-experience';

import MongoPaginator from '../../Presentation/Shared/MongoPaginator';
import IToken from '../../InterfaceAdapters/IEntities/Mongoose/ITokenDocument';
import ITokenDomain from '../../InterfaceAdapters/IInfrastructure/ITokenDomain';
import {connection} from '../Database/MongooseCreateConnection';

import NotFoundException from '../Exceptions/NotFoundException';

@injectable()
class TokenMongoRepository implements ITokenRepository
{
    private readonly repository: Model<IToken>;

    constructor()
    {
        this.repository = connection.model<IToken>('Token');
    }

    async save(token: ITokenDomain): Promise<ITokenDomain>
    {
        return await this.repository.create(token);
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
