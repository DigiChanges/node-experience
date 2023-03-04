import Category from '../../../Category/Domain/Entities/Category';
import IUserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/IUserMinimalDataTransformer';

interface IProductTransformer
{
    id: string;
    price: number;
    title: string;
    enable: boolean;
    category: Category,
    createdBy: IUserMinimalDataTransformer;
    lastModifiedBy: IUserMinimalDataTransformer;
    createdAt: number;
    updatedAt: number;
}

export default IProductTransformer;
