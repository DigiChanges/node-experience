import ICategoryDomain from './ICategoryDomain';
import Base from '../../../Shared/Domain/Entities/Base';

class Category extends Base implements ICategoryDomain
{
    title: string;
    enable: boolean;

    constructor()
    {
        super();
    }
}

export default Category;
