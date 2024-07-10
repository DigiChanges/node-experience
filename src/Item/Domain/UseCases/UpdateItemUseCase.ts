import ItemUpdatePayload from '../Payloads/ItemUpdatePayload';
import IItemDomain from '../Entities/IItemDomain';
import IItemRepository from '../Repositories/IItemRepository';
import ItemBuilder from '../Factories/ItemBuilder';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import ItemSchemaUpdateValidation from '../Validations/ItemSchemaUpdateValidation';

class UpdateItemUseCase
{
    constructor(private repository: IItemRepository)
    {
        this.repository = repository;
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
