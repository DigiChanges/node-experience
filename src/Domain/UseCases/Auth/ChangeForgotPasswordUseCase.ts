import { lazyInject } from '../../../inversify.config'
import ChangeForgotPasswordPayload from "../../Payloads/Auth/ChangeForgotPasswordPayload";
import {SERVICES} from "../../../services";
import IAuthService from "../../Services/Contracts/IAuthService";

class ChangeForgotPasswordUseCase
{
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

    async handle(data: ChangeForgotPasswordPayload)
    {
        return await this.service.changeForgotPassword(data);
    }
}

export default ChangeForgotPasswordUseCase;
