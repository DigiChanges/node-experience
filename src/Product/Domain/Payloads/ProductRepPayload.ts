
import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';

interface ProductRepPayload
{
    title: string;
    price: number;
    enable: boolean;
    category: ICategoryDomain;
}

export default ProductRepPayload;
