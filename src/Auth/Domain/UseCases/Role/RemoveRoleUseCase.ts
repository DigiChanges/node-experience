import IRoleDomain from '../../Entities/IRoleDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';
import container from '../../../../register';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import NameSchemaValidation from '../../../../Main/Presentation/Validations/NameSchemaValidation';

class RemoveRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(name: string): Promise<IRoleDomain>
    {
        await ValidatorSchema.handle(NameSchemaValidation, name);

        return await this.repository.delete(name);
    }
}

export default RemoveRoleUseCase;
