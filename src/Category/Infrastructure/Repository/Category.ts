import { ICategoryRepository } from 'Category/Domain/Entities/ICategoryRepository';
import { CategoriesMock } from './Mock/Category';
import { Category } from 'Category/Domain/Entities/Category';
import { ICategory } from 'Category/Domain/Entities/ICategory';

export class CategoryRepository extends Category implements ICategoryRepository
{
    isEneable(id: string): boolean | null
    {
        const element = CategoriesMock.find(categorie => categorie._id === id);
        if (!element)
        {
            return null;
        }
        // send a boolean and check if we need to show the products base on the category
        return element.eneable;
    }
    changeEneable(id: string): ICategory | null
    {
        const element = CategoriesMock.find(categorie => categorie._id === id);
        if (!element)
        {
            return null;
        }
        element.eneable = !element.eneable;
        return element;
    }
}
