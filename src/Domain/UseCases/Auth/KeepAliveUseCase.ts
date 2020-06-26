import { lazyInject } from '../../../inversify.config'
import KeepAlivePayload from "../../Payloads/Auth/KeepAlivePayload";
import {SERVICES} from "../../../services";
import IAuthService from "../../Services/Contracts/IAuthService";

class KeepAliveUseCase
{
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

    async handle(data: KeepAlivePayload)
    {
        return await this.service.regenerateToken(data);
    }
}

export default KeepAliveUseCase;
