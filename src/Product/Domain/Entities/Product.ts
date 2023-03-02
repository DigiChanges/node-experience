import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import Category from 'Category/Domain/Entitites/Category';
import Base from '../../../Shared/Domain/Entities/Base';
import IProductDomain from './IProductDomain';

class Product extends Base implements IProductDomain {
  title: string;
  price: number;
  enable: boolean;
  category: Category;
  createdBy: IUserDomain;
  lastModifiedBy: IUserDomain;

  constructor() {
    super();
  }
}

export default Product;
