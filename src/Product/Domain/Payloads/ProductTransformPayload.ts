import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
import IProductDomain from '../Entities/IProductDomain';

interface ProductTransformPayload extends Omit<IProductDomain, 'category'> {
    _id: string;
    category: CategoryTitle;
}

interface CategoryTitle {
    title: string;
}

export default ProductTransformPayload;
