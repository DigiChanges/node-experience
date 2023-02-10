import { ICategory } from 'Category/Domain/Entities/ICategory';

export interface IProduct {
    price: number;
    title: string;
    eneable: boolean;
    category: ICategory;
}
