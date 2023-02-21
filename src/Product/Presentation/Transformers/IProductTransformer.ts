import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';

interface IProductTransformer
{
    id: string;
    title: string;
    price: number;
    enable: boolean;
    category: ICategoryDomain;


    createdAt: number;
    updatedAt: number;
}

export default IProductTransformer;
