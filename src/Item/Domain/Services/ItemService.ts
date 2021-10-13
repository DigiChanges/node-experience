import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import Item from '../Entities/Item';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';


class ItemService
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async persist(item: IItemDomain, payload: ItemRepPayload): Promise<IItemDomain>
    {
        item.name = payload.get_name();
        item.type = payload.get_type();

        return await this.repository.save(item);
    }

    async create(payload: ItemRepPayload, auth_user: IUserDomain): Promise<IItemDomain>
    {
        const item = new Item();
        item.created_by = auth_user;

        return await this.persist(item, payload);
    }

    async update(payload: ItemUpdatePayload, auth_user: IUserDomain): Promise<IItemDomain>
    {
        const id = payload.get_id();
        const item: IItemDomain = await this.get_one(id);
        item.last_modified_by = auth_user;

        return await this.persist(item, payload);
    }

    async get_one(id: string): Promise<IItemDomain>
    {
        return await this.repository.get_one(id);
    }

    async remove(id: string): Promise<IItemDomain>
    {
        return await this.repository.delete(id);
    }

    async list(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ItemService;
