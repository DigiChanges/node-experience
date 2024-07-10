import ItemRepPayload from '../Payloads/ItemRepPayload';
import IItemDomain from '../Entities/IItemDomain';
import IItemRepository from '../Repositories/IItemRepository';
import ItemBuilder from '../Factories/ItemBuilder';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import ItemSchemaSaveValidation from '../Validations/ItemSchemaSaveValidation';

class SaveItemUseCase
{
    constructor(private repository: IItemRepository)
    {
        this.repository = repository;
    }

    async handle(payload: ItemRepPayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(ItemSchemaSaveValidation, payload);

        const item: IItemDomain = new ItemBuilder(payload)
            .setItem()
            .build()
            .create();

        return await this.repository.save(item);
    }
}

export default SaveItemUseCase;
