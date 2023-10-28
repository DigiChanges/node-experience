import ItemRepPayload from '../Payloads/ItemRepPayload';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import container from '../../../register';
import ItemBuilder from '../Factories/ItemBuilder';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import ItemSchemaSaveValidation from '../../Presentation/Validations/ItemSchemaSaveValidation';

class SaveItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
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
