import { Item } from '../Entities/Item';
import { getRepository, Repository } from 'typeorm';
import ItemPayload from '../Payloads/ItemPayload';
import {injectable} from 'inversify';
import ItemRepPayload from "../Payloads/ItemRepPayload";
import ItemShowPayload from "../Payloads/ItemShowPayload";
import Criteria from "../Payloads/Criteria";

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

    public async list (criteria: Criteria)
    {
        return await this.repository.find();
    }

    public async getOne (payload: ItemShowPayload)
    {
        const id = payload.id();
        let item = await this.repository.findOne(id);

        if (!item) {
            // throw Exception;
        }

        return item;
    }
}

export default ItemService;