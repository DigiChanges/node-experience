import Category from 'category/Domain/Entities/Category';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface ProductRepPayload
{
    title: string;
    price: number;
    enable: boolean;
    category: Category;
    createdBy: IUserDomain;
}

export default ProductRepPayload;
