import UserUpdatePayload from "../../../../InterfaceAdapters/Payloads/Users/UserUpdatePayload";
import IdRequest from "../Defaults/IdRequest";
import {IsBoolean, IsEmail, IsString, Length} from "class-validator";

class UserUpdateRequest extends IdRequest implements UserUpdatePayload
{
    @Length(3, 50)
    @IsString()
    firstName: string

    @Length(3, 50)
    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @IsBoolean()
    enable: boolean

    @IsString()
    userId: string;

    constructor(request: any)
    {
        super(request);
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
        this.enable = request.body.enable;
        this.userId = request.tokenDecode.userId;
    }

    getFirstName(): string
    {
        return this.firstName;
    }

    getLastName(): string
    {
        return this.lastName;
    }

    getEmail(): string
    {
        return this.email;
    }

    getEnable(): boolean
    {
        return this.enable;
    }

    getTokenUserId(): string
    {
        return this.userId;
    }
}

export default UserUpdateRequest;
