import { lazyInject } from '../../../inversify.config'
import ChangeForgotPasswordPayload from "../../../InterfaceAdapters/Payloads/Auth/ChangeForgotPasswordPayload";
import {SERVICES} from "../../../services";
import IAuthService from "../../../InterfaceAdapters/IServices/IAuthService";

class ChangeForgotPasswordUseCase
{
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

    async handle(payload: ChangeForgotPasswordPayload)
    {
        return await this.service.changeForgotPassword(payload);
    }
}

export default ChangeForgotPasswordUseCase;
