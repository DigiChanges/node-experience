import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import Category from '../../../Category/Domain/Entities/Category';

interface ProductRepPayload {

    title: string;
    price: number;
    enable: boolean;
    category: Category;
    createdBy: IUserDomain;

}

export default ProductRepPayload;
