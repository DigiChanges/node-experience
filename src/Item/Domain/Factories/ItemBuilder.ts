import Item from '../Entities/Item';
import ItemRepPayload from '../Payloads/ItemRepPayload';
import IItemDomain from '../Entities/IItemDomain';

class ItemBuilder
{
    private _item: IItemDomain;
    private _payload: ItemRepPayload;

    constructor(payload?: ItemRepPayload)
    {
        this._payload = payload;
    }

    setItem(item?: IItemDomain)
    {
        this._item = item ?? new Item();

        return this;
    }

    build()
    {
        this._item.name = this._payload.name;
        this._item.type = this._payload.type;

        return this;
    }

    update()
    {
        this._item.lastModifiedBy = this._payload.createdBy;

        return this._item;
    }

    create()
    {
        this._item.createdBy = this._payload.createdBy;
        this._item.lastModifiedBy = this._payload.createdBy;

        return this._item;
    }
}

export default ItemBuilder;
