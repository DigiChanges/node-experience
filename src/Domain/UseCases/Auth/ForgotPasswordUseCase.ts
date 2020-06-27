import { lazyInject } from '../../../inversify.config'
import ForgotPasswordPayload from "../../../InterfaceAdapters/Payloads/Auth/ForgotPasswordPayload";
import {SERVICES} from "../../../services";
import IAuthService from "../../../InterfaceAdapters/IServices/IAuthService";

class ForgotPasswordUseCase
{
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

    async handle(payload: ForgotPasswordPayload)
    {
        return await this.service.forgotPassword(payload);
    }
}

export default ForgotPasswordUseCase;
