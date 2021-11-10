import UserUpdatePayload from '../../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import { decorate, Mixin } from 'ts-mixer';
import UserRepRequest from './UserRepRequest';
import { IsEmail, IsString, IsUUID, Length } from 'class-validator';
import { Unique } from '../../../../Shared/Decorators/unique';
import { REPOSITORIES } from '../../../../repositories';

class UserUpdateRequest extends Mixin(UserRepRequest, IdRequest) implements UserUpdatePayload
{
    @IsUUID('4')
    userId: string;

    @decorate(IsEmail())
    @decorate(Unique({
        repository: REPOSITORIES.IUserRepository,
        refAttr: 'id'
    }))
    email: string;

    @decorate(Length(3, 16))
    @decorate(IsString())
    @decorate(Unique({
        repository: REPOSITORIES.IUserRepository,
        refAttr: 'id'
    }))
    documentNumber: string;

    constructor(data: Record<string, any>, id: string, userId: string)
    {
        super(data);
        this.id = id;
        this.userId = userId;
        this.email = data.email;
        this.documentNumber = data.documentNumber;
    }

    getTokenUserId(): string
    {
        return this.userId;
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

export default UserUpdateRequest;
