import ItemUpdatePayload from '../Payloads/ItemUpdatePayload';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ItemBuilder from '../Factories/ItemBuilder';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import ItemSchemaUpdateValidation from '../../Presentation/Validations/ItemSchemaUpdateValidation';

class UpdateItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: ItemUpdatePayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(ItemSchemaUpdateValidation, payload);

        let item: IItemDomain = await this.repository.getOne(payload.id);

        item = new ItemBuilder(payload)
            .setItem(item)
            .build()
            .update();

        return await this.repository.update(item);
    }
}

export default UpdateItemUseCase;
