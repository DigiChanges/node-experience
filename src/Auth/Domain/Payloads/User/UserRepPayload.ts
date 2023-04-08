import IRoleDomain from '../../../Domain/Entities/IRoleDomain';

interface UserRepPayload
{
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    genre: string;
    phone: string;
    country: string;
    verify?: boolean;
    enable: boolean;
    roles: IRoleDomain[];
}

export default UserRepPayload;
