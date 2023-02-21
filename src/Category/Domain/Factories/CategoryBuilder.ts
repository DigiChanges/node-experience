import Category from '../Entities/Category';
import CategoryRepPayload from '../Payloads/CategoryRepPayload';
import ICategoryDomain from '../Entities/ICategoryDomain';

class CategoryBuilder
{
    private _category: ICategoryDomain;
    private _payload: CategoryRepPayload;

    constructor(payload?: CategoryRepPayload)
    {
        this._payload = payload;
    }

    setCategory(category?: ICategoryDomain)
    {
        this._category = category ?? new Category();

        return this;
    }

    build()
    {
        this._category.title = this._payload.title;
        this._category.enable = this._payload.enable;

        return this;
    }

    update()
    {
        return this._category;
    }

    create()
    {
        return this._category;
    }
}

export default CategoryBuilder;
