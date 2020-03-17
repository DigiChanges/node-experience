import { Item } from '../Entities/Item';
import { getRepository, Repository } from 'typeorm';
import ItemPayload from '../Payloads/ItemPayload';
import {injectable} from 'inversify';

@injectable()
class ItemService {
    private repository: Repository<Item>;

    constructor() {
        this.repository = getRepository(Item);
    }

    public async save (payload: ItemPayload): Promise<Item> {

        const item = new Item();
        item.name = payload.name();
        item.type = payload.type();

        await this.repository.save(item);

        return item;
    }

    public async list (payload: ItemPayload)
    {
        return await this.repository.find();
    }
}

export default ItemService;