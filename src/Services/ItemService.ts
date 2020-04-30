import Item from '../Entities/Item';
import {inject, injectable} from 'inversify';
import ItemRepPayload from "../Payloads/Items/ItemRepPayload";
import IdPayload from "../Payloads/Defaults/IdPayload";
import ItemUpdatePayload from "../Payloads/Items/ItemUpdatePayload";
import {REPOSITORIES} from "../repositories";
import IItemRepository from "../Repositories/Contracts/IItemRepository";
import ICriteria from "../Lib/Contracts/ICriteria";
import IItemService from "./Contracts/IItemService";

@injectable()
class ItemService implements IItemService
{
    private repository: IItemRepository;

    constructor(@inject(REPOSITORIES.IItemRepository) repository: IItemRepository)
    {
        this.repository = repository;
    }

    public async save (payload: ItemRepPayload): Promise<Item>
    {

        const item = new Item();
        item.name = payload.name();
        item.type = payload.type();
        item.enable = payload.enable();

        await this.repository.save(item);

        return item;
    }

    public async update (payload: ItemUpdatePayload): Promise<Item>
    {
        const id = payload.id();
        const item = await this.repository.findOne(id);

        item.name = payload.name();
        item.type = payload.type();
        item.enable = payload.enable();

        await this.repository.save(item);

        return item;
    }

    public async list (criteria: ICriteria)
    {
        return await this.repository.list(criteria);
    }

    public async getOne (payload: IdPayload): Promise<Item>
    {
        const id = payload.id();
        return await this.repository.findOne(id);
    }

    public async remove (payload: IdPayload): Promise<any>
    {
        const id = payload.id();
        return await this.repository.delete(id);
    }
}

export default ItemService;