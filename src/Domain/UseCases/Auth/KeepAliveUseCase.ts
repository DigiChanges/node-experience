import { lazyInject } from '../../../inversify.config'
import KeepAlivePayload from "../../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload";
import {SERVICES} from "../../../services";
import IAuthService from "../../../InterfaceAdapters/IServices/IAuthService";

class KeepAliveUseCase
{
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

    async handle(payload: KeepAlivePayload)
    {
        return await this.service.regenerateToken(payload);
    }
}

export default KeepAliveUseCase;
