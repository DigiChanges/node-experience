import ItemRepPayload from '../Payloads/ItemRepPayload';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Shared/DI/Injects';
import IItemRepository from '../Repositories/IItemRepository';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';
import ItemBuilder from '../Factories/ItemBuilder';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import ItemSchemaSaveValidation from '../Validations/ItemSchemaSaveValidation';

class SaveItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = DependencyInjector.inject<IItemRepository>(REPOSITORIES.IItemRepository);
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
