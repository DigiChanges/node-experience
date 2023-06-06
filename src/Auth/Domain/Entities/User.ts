import IUserDomain from './IUserDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import UserRepPayload from '../Payloads/User/UserRepPayload';

class User extends Base implements IUserDomain
{
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    genre: string;
    phone: string;
    country: string;
    enable: boolean;
    emailVerified: boolean;

    constructor(payload: UserRepPayload)
    {
        super();
        this._id = payload?._id ?? this._id;
        this.updateRep(payload);
    }

    updateRep(payload: UserRepPayload)
    {
        this.firstName = payload?.firstName ?? this.firstName;
        this.lastName = payload?.lastName ?? this.lastName;
        this.email = payload?.email ?? this.email;
        this.birthdate = payload?.birthdate ?? this.birthdate;
        this.genre = payload?.genre ?? this.genre;
        this.phone = payload?.phone ?? this.phone;
        this.country = payload?.country ?? this.country;
        this.enable = payload?.enable !== undefined || payload?.enable !== null ? payload?.enable : this.enable;
        this.emailVerified = payload?.emailVerified  ?? this.emailVerified;
    }
}

export default User;
