import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";
import UserAssignRolePayload from "../../../InterfaceAdapters/Payloads/Users/UserAssignRolePayload";

class AssignRoleUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    async handle(data: UserAssignRolePayload): Promise<IUser>
    {
        return await this.service.assignRole(data);
    }
}

export default AssignRoleUseCase;
