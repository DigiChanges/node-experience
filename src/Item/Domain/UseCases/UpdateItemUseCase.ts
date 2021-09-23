import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class UpdateItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemUpdatePayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        const id = payload.getId();

        const item = await this.repository.getOne(id);

        item.name = payload.getName();
        item.type = payload.getType();
        item.lastModifiedBy = authUser;

        return await this.repository.update(item);
    }
}

export default UpdateItemUseCase;
