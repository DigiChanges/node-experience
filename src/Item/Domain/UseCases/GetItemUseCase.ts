import { IdPayload } from '@digichanges/shared-experience';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';
import container from '../../../register';

class GetItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        return await this.repository.getOne(payload.id);
    }
}

export default GetItemUseCase;
