import {Model} from 'mongoose';
import {Document} from 'mongoose';
import {injectable, unmanaged} from 'inversify';
import {connection} from '../Database/MongooseCreateConnection';

@injectable()
abstract class BaseMongoRepository<T, D extends Document & T>
{
    protected repository: Model<D>;

    constructor(@unmanaged() entityName: string)
    {
        this.repository = connection.model<D>(entityName);
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.create(entity);
    }
}

export default BaseMongoRepository;
