import IProductDomain from '../../Domain/Entities/IProductDomain';
import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';

interface IProductRepository extends IBaseRepository<IProductDomain> {
    list(): Promise<IProductDomain[]>
    getOneProduct(payload: IdPayload): Promise<IProductDomain>
}

export default IProductRepository;
