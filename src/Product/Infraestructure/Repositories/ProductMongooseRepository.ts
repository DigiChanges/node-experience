import IProductDomain from '../../Domain/Entities/IProductDomain';
import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import { ProductMongooseDocument } from '../Schemas/ProductMongoose';
import Product from '../../Domain/Entities/Product';
import IProductRepository from './IProductRepository';

class ProductMongooseRepository extends BaseMongooseRepository<IProductDomain, ProductMongooseDocument> implements IProductRepository
{
    constructor()
    {
        super(Product.name);
    }

    async list(): Promise<IProductDomain[]>
    {
        return this.repository.find();
    }
}

export default ProductMongooseRepository;
