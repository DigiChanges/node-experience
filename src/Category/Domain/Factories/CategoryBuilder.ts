import CategoryRepPayloads from '../../../Category/Domain/Payloads/CategoryRepPayload';
import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
import Category from '../../../Category/Domain/Entities/Category';


class CategoryBuilder
{
    private _category: ICategoryDomain;
    private _payload: CategoryRepPayloads;

    constructor(payload?: CategoryRepPayloads)
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
        this._category.lastModifiedBy = this._payload.createdBy;

        return this._category;
    }

    create()
    {
        this._category.createdBy = this._payload.createdBy;
        this._category.lastModifiedBy = this._payload.createdBy;

        return this._category;
    }
}

export default CategoryBuilder;
