import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface ProductRepPayload
{
    price: number;
    title: string;
    enable: boolean;
    category: ICategoryDomain;
    createdBy: IUserDomain;
}

export default ProductRepPayload;
