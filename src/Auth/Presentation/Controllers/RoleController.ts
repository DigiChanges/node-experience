import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import SaveRoleUseCase from '../../Domain/UseCases/Role/SaveRoleUseCase';
import ListRolesUseCase from '../../Domain/UseCases/Role/ListRolesUseCase';
import GetRoleUseCase from '../../Domain/UseCases/Role/GetRoleUseCase';
import RemoveRoleUseCase from '../../Domain/UseCases/Role/RemoveRoleUseCase';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import UpdateRoleUseCase from '../../Domain/UseCases/Role/UpdateRoleUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import RoleRepPayload from '../../Domain/Payloads/Role/RoleRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import RoleUpdatePayload from '../../Domain/Payloads/Role/RoleUpdatePayload';
import RoleSchemaSaveValidation from '../Validations/Role/RoleSchemaSaveValidation';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import RoleFilter from '../Criterias/RoleFilter';
import RoleSort from '../Criterias/RoleSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import RoleSchemaUpdateValidation from '../Validations/Role/RoleSchemaUpdateValidation';
import NameSchemaValidation from '../../../Shared/Presentation/Validations/NameSchemaValidation';

class RoleController
{
    public async save(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        await ValidatorSchema.handle(RoleSchemaSaveValidation, payload);

        const useCase = new SaveRoleUseCase();
        return await useCase.handle(payload);
    }

    public async list(payload: CriteriaPayload): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new RoleFilter(payload.query),
                sort: new RoleSort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListRolesUseCase();
        return await useCase.handle(requestCriteria);
    }

    public async getOne(payload: IdPayload): Promise<IRoleDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new GetRoleUseCase();
        return await useCase.handle(payload);
    }

    public async update(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        await ValidatorSchema.handle(RoleSchemaUpdateValidation, payload);

        const useCase = new UpdateRoleUseCase();
        return await useCase.handle(payload);
    }

    public async remove(payload: string): Promise<IRoleDomain>
    {
        await ValidatorSchema.handle(NameSchemaValidation, payload);

        const useCase = new RemoveRoleUseCase();
        return await useCase.handle(payload);
    }
}

export default RoleController;
