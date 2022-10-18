import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import SaveRoleUseCase from '../../Domain/UseCases/Role/SaveRoleUseCase';
import ListRolesUseCase from '../../Domain/UseCases/Role/ListRolesUseCase';
import GetRoleUseCase from '../../Domain/UseCases/Role/GetRoleUseCase';
import RemoveRoleUseCase from '../../Domain/UseCases/Role/RemoveRoleUseCase';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import UpdateRoleUseCase from '../../Domain/UseCases/Role/UpdateRoleUseCase';
import ValidatorRequest from '../../../Shared/Presentation/Shared/ValidatorRequest';
import RoleRepPayload from '../../Domain/Payloads/Role/RoleRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import RoleUpdatePayload from '../../Domain/Payloads/Role/RoleUpdatePayload';

class RoleController
{
    public async save(request: RoleRepPayload): Promise<IRoleDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new SaveRoleUseCase();
        return await useCase.handle(request);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ListRolesUseCase();
        return await useCase.handle(request);
    }

    public async getOne(request: IdPayload): Promise<IRoleDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new GetRoleUseCase();
        return await useCase.handle(request);
    }

    public async update(request: RoleUpdatePayload): Promise<IRoleDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new UpdateRoleUseCase();
        return await useCase.handle(request);
    }

    public async remove(request: IdPayload): Promise<IRoleDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new RemoveRoleUseCase();
        return await useCase.handle(request);
    }
}

export default RoleController;
