import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import UserUpdatePayload from "../../../InterfaceAdapters/Payloads/Users/UserUpdatePayload";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";

class UpdateUserUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    async handle(payload: UserUpdatePayload): Promise<IUser>
    {
        return await this.service.update(payload);
    }
}

export default UpdateUserUseCase;
