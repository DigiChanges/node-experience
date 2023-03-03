import IRoleDomain from '../../../Domain/Entities/IRoleDomain';

interface UserRepPayload
{
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    documentType: string;
    documentNumber: string;
    gender: string;
    phone: string;
    country: string;
    address: string;
    verify?: boolean;
    enable: boolean;
    roles: IRoleDomain[];
    permissions: string[];
    passwordRequestedAt?: Date;
    isSuperAdmin: boolean;
}

export default UserRepPayload;
