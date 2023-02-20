import Category from 'category/Domain/Entities/Category';
import IUserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/IUserMinimalDataTransformer';

interface IProductTransformer
{
    id: string;
    title: string;
    price: number;
    enable: boolean;
    category: Category;
    createdBy: IUserMinimalDataTransformer;
    lastModifiedBy: IUserMinimalDataTransformer;
    createdAt: number;
    updatedAt: number;
}

export default IProductTransformer;
