import { IdPayload } from '@digichanges/shared-experience';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import container from '../../../register';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';

class RemoveItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
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
