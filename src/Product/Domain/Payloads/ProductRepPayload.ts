import Category from '../../../Category/Domain/Entities/Category';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface ProductRepPayload
{
    price: number;
    title: string;
    enable: boolean;
    category: Category;
    createdBy: IUserDomain;
}

export default ProductRepPayload;
