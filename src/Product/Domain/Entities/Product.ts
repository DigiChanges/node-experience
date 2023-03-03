import IProductDomain from './IProductDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';

class Product extends Base implements IProductDomain
{
    price: number;
    title: string;
    enable: boolean;
    category: ICategoryDomain;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    constructor()
    {
        super();
    }
}

export default Product;
