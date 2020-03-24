import { Item } from '../Entities/Item';
import { getRepository, Repository } from 'typeorm';
import {injectable} from 'inversify';
import ItemRepPayload from "../Payloads/Items/ItemRepPayload";
import IdPayload from "../Payloads/Defaults/IdPayload";
import CriteriaPayload from "../Payloads/CriteriaPayload";
import ItemUpdatePayload from "../Payloads/Items/ItemUpdatePayload";

@injectable()
class ItemService {
    private repository: Repository<Item>;

    constructor() {
        this.repository = getRepository(Item);
    }

    public async save (payload: ItemRepPayload): Promise<Item> {

        const item = new Item();
        item.name = payload.name();
        item.type = payload.type();

        await this.repository.save(item);

        return item;
    }

    public async update (payload: ItemUpdatePayload): Promise<Item>
    {
        const id = payload.id();
        const item = await this.repository.findOne(id);

        item.name = payload.name();
        item.type = payload.type();

        await this.repository.save(item);

        return item;
    }

    public async list (criteria: CriteriaPayload)
    {
        return await this.repository.find();
    }

    public async getOne (payload: IdPayload): Promise<Item>
    {
        const id = payload.id();
        const item = await this.repository.findOne(id);

        if (!item) {
            // throw Exception;
        }

        return item;
    }

    public async remove (payload: IdPayload): Promise<Item>
    {
        const id = payload.id();
        const item = await this.repository.findOne(id);
        await this.repository.delete(item);

        return item;
    }
}

export default ItemService;