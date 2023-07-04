import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import IRoleDomain from '../../Entities/IRoleDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import ValidatorSchema from '../../../../Shared/Utils/ValidatorSchema';
import NameSchemaValidation from '../../../../Shared/Presentation/Validations/NameSchemaValidation';

class GetRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        await ValidatorSchema.handle(NameSchemaValidation, payload.id);

        return await this.repository.getOne(payload.id);
    }
}

export default GetRoleUseCase;
