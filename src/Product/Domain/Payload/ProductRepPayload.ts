import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ICategory from '../../../Category/Domain/Entities/ICategory';

interface ProductRepPayload
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
    category: ICategory;
}

export default ProductRepPayload;
