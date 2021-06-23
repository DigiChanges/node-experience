import {IsString} from 'class-validator';

import ChangeUserPasswordPayload from '../../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';

class ChangeUserPasswordRequest extends IdRequest implements ChangeUserPasswordPayload
{
    @IsString()
    newPassword: string;

    @IsString()
    newPasswordConfirmation: string;

    constructor(data: Record<string, any>, id: string)
    {
        super(id);
        this.newPassword = data.newPassword;
        this.newPasswordConfirmation = data.newPasswordConfirmation;
    }

    getNewPassword(): string
    {
        return this.newPassword;
    }

    getNewPasswordConfirmation(): string
    {
        return this.newPasswordConfirmation;
    }
}

export default ChangeUserPasswordRequest;
