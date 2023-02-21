import IProductDomain from './IProductDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';


class Product extends Base implements IProductDomain
{
    price: number;
    title: string;
    enable: boolean;
    category: ICategoryDomain;

    constructor()
    {
        super();
    }

    getCategory(): ICategoryDomain
    {
        return this.category;
    }
}

export default Product;
