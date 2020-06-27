import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";
import ChangeMyPasswordPayload from "../../../InterfaceAdapters/Payloads/Users/ChangeMyPasswordPayload";

class ChangeMyPasswordUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    async handle(data: ChangeMyPasswordPayload): Promise<IUser>
    {
        return await this.service.changeMyPassword(data);
    }
}

export default ChangeMyPasswordUseCase;
