import Base from '../../../Shared/Domain/Entities/Base';
import { ICategory } from './ICategory';

export class Category extends Base implements ICategory
{
    eneable: boolean;
    constructor(readonly title: string)
    {
        super();
        this.title = title;
    }
}
