import Category from '../Entities/Category';
import CategoryRepPayload from '../Payloads/CategoryRepPayload';
import ICategoryDomain from '../Entities/CategoryDomain';

class CategoryBuilder
{
    private _Category: ICategoryDomain;
    private _payload: CategoryRepPayload;

    constructor(payload?: CategoryRepPayload)
    {
        this._payload = payload;
    }

    setCategory(category?: ICategoryDomain)
    {
        this._Category = category ?? new Category();

        return this;
    }

    build()
    {
        this._Category.title = this._payload.title;
        this._Category.enable = this._payload.enable;

        return this;
    }

    update()
    {
        this._Category.lastModifiedBy = this._payload.createdBy;

        return this._Category;
    }

    create()
    {
        this._Category.createdBy = this._payload.createdBy;
        this._Category.lastModifiedBy = this._payload.createdBy;

        return this._Category;
    }
}

export default CategoryBuilder;
