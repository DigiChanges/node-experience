import IProductDomain from './IProductDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import Category from 'category/Domain/Entities/Category';


class Product extends Base implements IProductDomain
{
    title: string;
    price: number;
    enable: boolean;
    category: Category;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    constructor()
    {
        super();
    }
}

export default Product;
