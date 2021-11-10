import { decorate, Mixin } from 'ts-mixer';
import UserWithoutPermissionsRequest
    from '../../../../User/Presentation/Requests/Express/UserWithoutPermissionsRequest';
import UserRepPayload from '../../../../User/InterfaceAdapters/Payloads/UserRepPayload';
import { IsEmail, IsString, IsUUID, Length } from 'class-validator';
import { Unique } from '../../../../Shared/Decorators/unique';
import { REPOSITORIES } from '../../../../repositories';

class UpdateMeRequest extends Mixin(UserWithoutPermissionsRequest) implements UserRepPayload
{
    @IsUUID('4')
    userId: string;

    @decorate(IsEmail())
    @decorate(Unique({
        repository: REPOSITORIES.IUserRepository,
        refAttr: 'userId'
    }))
    email: string;

    @decorate(Length(3, 16))
    @decorate(IsString())
    @decorate(Unique({
        repository: REPOSITORIES.IUserRepository,
        refAttr: 'userId'
    }))
    documentNumber: string;

    constructor(data: Record<string, any>, userId: string)
    {
        super(data);
        this.userId = userId;
        this.email = data.email;
        this.documentNumber = data.documentNumber;
    }

    getEmail(): string
    {
        return this.email;
    }

    getDocumentNumber(): string
    {
        return this.documentNumber;
    }
}

export default UpdateMeRequest;
