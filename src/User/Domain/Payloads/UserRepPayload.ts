import IRoleDomain from '../../../Role/Domain/Entities/IRoleDomain';

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
    enable: boolean;
    roles: IRoleDomain[];
    permissions: string[];
    confirmationToken: string;
    passwordRequestedAt: null;
    isSuperAdmin: boolean;
}

export default UserRepPayload;
