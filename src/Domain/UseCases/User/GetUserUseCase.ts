import { lazyInject } from "../../../inversify.config";
import { SERVICES } from "../../../services";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";

class GetUserUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    async handle(payload: IdPayload): Promise<IUser>
    {
        return await this.service.getOne(payload);
    }
}

export default GetUserUseCase;
