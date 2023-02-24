import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import ICategoryDomain from './ICategoryDomain';

class Category extends Base implements ICategoryDomain
{
    title: string;
    enable: boolean;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    constructor()
    {
        super();
    }
}

export default Category;
