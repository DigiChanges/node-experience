import { Category } from 'Category/Domain/Entities/Category';
import { ICategory } from 'Category/Domain/Entities/ICategory';

const Categories: Pick<ICategory, 'title'>[] = [
    {
        title: '1'
    },
    {
        title: '2'
    },
    {
        title: '3'
    },
    {
        title: '4'
    },
    {
        title: '5'
    }
];

export const CategoriesMock = Categories.map(e => new Category(e.title));

