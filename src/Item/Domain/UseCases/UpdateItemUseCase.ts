import ItemUpdatePayload from '../Payloads/ItemUpdatePayload';
import IItemDomain from '../Entities/IItemDomain';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';

class UpdateItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemUpdatePayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        const item: IItemDomain = await this.repository.getOne(payload.id);
        item.updateBuild(payload);
        item.lastModifiedBy = authUser;

        return await this.repository.update(item);
    }
}

export default UpdateItemUseCase;
