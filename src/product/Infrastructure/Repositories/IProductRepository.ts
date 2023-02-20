import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import Product from 'product/Domain/Entities/Product';

interface IProductRepository extends IBaseRepository<IProductDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
    getAllByCategoryId(id: string): Promise<Product[]>
}

export default IProductRepository;
