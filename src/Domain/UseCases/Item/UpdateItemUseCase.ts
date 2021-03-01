import ItemUpdatePayload from "../../../InterfaceAdapters/Payloads/Items/ItemUpdatePayload";
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";
import IItemDomain from "../../../InterfaceAdapters/IDomain/IItemDomain";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class UpdateItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: ItemUpdatePayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        const item = await this.repository.getOne(id);

        item.name = payload.getName();
        item.type = payload.getType();

        await this.repository.save(item);

        return item;
    }
}

export default UpdateItemUseCase;
