import Base from '../../../Shared/Domain/Entities/Base';
import CategoryRepPayload from '../Payloads/CategoryRepPayload';
import ICategoryDomain from './ICategoryDomain';

class Category extends Base implements ICategoryDomain
{
    title: string;
    enable: boolean;

    constructor(payload: CategoryRepPayload)
    {
        super();
        this.title = payload.title;
        this.enable = payload.enable;
    }

    updateBuild(payload: CategoryRepPayload): void
    {
        this.title = payload.title;
        this.enable = payload.enable;
    }
}

export default Category;
