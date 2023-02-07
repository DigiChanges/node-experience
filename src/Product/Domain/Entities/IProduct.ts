import IProductDomain from './IProductDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ICategory from '../../../Category/Domain/Entities/ICategory'

class Product extends Base implements IProductDomain
{
    name: string;
    type: number;
    price: number;
    title: string;
    enable: boolean;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
    category: ICategory;

    constructor()
    {
        super();
        
    }
   
    shouldBeShownAndListed(): boolean {
        return  this.category.enable;
    }
}

export default Product;
