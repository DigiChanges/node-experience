import Base from '../../../Shared/Domain/Entities/Base';
import { IProduct } from './IProduct';
import { ICategory } from 'Category/Domain/Entities/ICategory';

export class Product extends Base implements IProduct
{
    constructor(readonly category: ICategory, readonly price: number, readonly title: string)
    {
        super();
        this.category = category;
        this.price = price;
        this.title = title;
    }
    eneable = true;
}
