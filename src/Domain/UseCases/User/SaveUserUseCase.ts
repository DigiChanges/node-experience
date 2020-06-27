import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import UserRepPayload from "../../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";

class SaveUserUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    async handle(data: UserRepPayload): Promise<IUser>
    {
        return await this.service.save(data);
    }
}

export default SaveUserUseCase;
