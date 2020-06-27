import { lazyInject } from '../../../inversify.config'
import AuthPayload from "../../../InterfaceAdapters/Payloads/Auth/AuthPayload";
import {SERVICES} from "../../../services";
import IAuthService from "../../../InterfaceAdapters/IServices/IAuthService";

class LoginUseCase
{
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

    async handle(payload: AuthPayload)
    {
        return await this.service.login(payload);
    }
}

export default LoginUseCase;
