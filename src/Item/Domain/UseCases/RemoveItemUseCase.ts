import IItemDomain from '../Entities/IItemDomain';
import IItemRepository from '../Repositories/IItemRepository';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Domain/Validations/IdSchemaValidation';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';

class RemoveItemUseCase
{
    constructor(private repository: IItemRepository)
    {
        this.repository = repository;
    }

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveItemUseCase;
