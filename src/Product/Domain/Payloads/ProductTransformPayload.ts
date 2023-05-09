import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
import IProductDomain from '../Entities/IProductDomain';

interface ProductTransformPayload extends Omit<IProductDomain, 'category'> {
    _id: string;
    category: CategoryID;
}

interface CategoryID {
    _id: string;
}

export default ProductTransformPayload;
