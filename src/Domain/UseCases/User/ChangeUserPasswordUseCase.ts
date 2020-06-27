import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";
import ChangeUserPasswordPayload from "../../../InterfaceAdapters/Payloads/Users/ChangeUserPasswordPayload";

class ChangeUserPasswordUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    async handle(data: ChangeUserPasswordPayload): Promise<IUser>
    {
        return await this.service.changeUserPassword(data);
    }
}

export default ChangeUserPasswordUseCase;
