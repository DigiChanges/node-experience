import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
import IUserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/IUserMinimalDataTransformer';

interface IProductTransformer
{
    id: string;
    price: number;
    title: string;
    enable: boolean;
    category: ICategoryDomain,
    createdBy: IUserMinimalDataTransformer;
    lastModifiedBy: IUserMinimalDataTransformer;
    createdAt: number;
    updatedAt: number;
}

export default IProductTransformer;
