import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import { getRequestContext } from '../../../Shared/Utils/RequestContext';
import ValidatorSchema from '../../../Shared/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';

class RemoveItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveItemUseCase;
