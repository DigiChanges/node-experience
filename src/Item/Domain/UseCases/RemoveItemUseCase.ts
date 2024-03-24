import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Shared/DI/Injects';
import IItemRepository from '../Repositories/IItemRepository';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Domain/Validations/IdSchemaValidation';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';

class RemoveItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = DependencyInjector.inject<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveItemUseCase;
