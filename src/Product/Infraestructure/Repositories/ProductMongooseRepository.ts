import IProductDomain from '../../Domain/Entities/IProductDomain';
import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import { ProductMongooseDocument } from '../Schemas/ProductMongoose';
import Product from '../../Domain/Entities/Product';
import IProductRepository from './IProductRepository';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';

class ProductMongooseRepository extends BaseMongooseRepository<IProductDomain, ProductMongooseDocument> implements IProductRepository
{
    constructor()
    {
        super(Product.name);
    }

    async list(): Promise<IProductDomain[]>
    {
        const pipeline = [
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $match: {
                    $or: [
                        { category: { $exists: false } },
                        { 'category.enable': true }
                    ]
                }
            }
        ];

        return await this.repository.aggregate(pipeline).exec();
    }

    async getOneProduct(payload: IdPayload): Promise<IProductDomain>
    {
        const { id } = payload;
        const pipeline = [
            {
                $match: { _id: id  }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $match: {
                    $or: [
                        { category: { $exists: false } },
                        { 'category.enable': true }
                    ]
                }
            }
        ];

        const data = await this.repository.aggregate(pipeline).exec();
        return data[0];
    }
}

export default ProductMongooseRepository;
