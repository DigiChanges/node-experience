import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";
import UserAssignRolePayload from "../../../InterfaceAdapters/Payloads/Users/UserAssignRolePayload";
import ErrorException from "../../../Lib/ErrorException";

class AssignRoleUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    async handle(payload: UserAssignRolePayload): Promise<IUser>
    {
        const user: IUser = await this.service.getOne(payload);

        return await this.service.assignRole(payload, user);
    }
}

export default AssignRoleUseCase;
