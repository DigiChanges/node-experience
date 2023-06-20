import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';

class GetItemUseCase
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

        return await this.repository.getOne(payload.id);
    }
}

export default GetItemUseCase;
