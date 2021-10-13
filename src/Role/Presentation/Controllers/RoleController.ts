import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import SaveRoleUseCase from '../../Domain/UseCases/SaveRoleUseCase';
import ListRolesUseCase from '../../Domain/UseCases/ListRolesUseCase';
import GetRoleUseCase from '../../Domain/UseCases/GetRoleUseCase';
import RemoveRoleUseCase from '../../Domain/UseCases/RemoveRoleUseCase';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import UpdateRoleUseCase from '../../Domain/UseCases/UpdateRoleUseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';
import RoleRepPayload from '../../InterfaceAdapters/Payloads/RoleRepPayload';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import RoleUpdatePayload from '../../InterfaceAdapters/Payloads/RoleUpdatePayload';

class RoleController
{
    public async save(request: RoleRepPayload): Promise<IRoleDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new SaveRoleUseCase();
        return await use_case.handle(request);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const use_case = new ListRolesUseCase();
        return await use_case.handle(request);
    }

    public async get_one(request: IdPayload): Promise<IRoleDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new GetRoleUseCase();
        return await use_case.handle(request);
    }

    public async update(request: RoleUpdatePayload): Promise<IRoleDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new UpdateRoleUseCase();
        return await use_case.handle(request);
    }

    public async remove(request: IdPayload): Promise<any>
    {
        await ValidatorRequest.handle(request);

        const use_case = new RemoveRoleUseCase();
        return await use_case.handle(request);
    }
}

export default RoleController;
