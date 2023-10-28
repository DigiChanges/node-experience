import ItemUpdatePayload from '../Payloads/ItemUpdatePayload';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import container from '../../../register';
import ItemBuilder from '../Factories/ItemBuilder';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import ItemSchemaUpdateValidation from '../../Presentation/Validations/ItemSchemaUpdateValidation';

class UpdateItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
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
