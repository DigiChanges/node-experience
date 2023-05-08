import IProductDomain from '../../Domain/Entities/IProductDomain';
import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';

interface IProductRepository extends IBaseRepository<IProductDomain> {
    list(): Promise<IProductDomain[]>
}

export default IProductRepository;