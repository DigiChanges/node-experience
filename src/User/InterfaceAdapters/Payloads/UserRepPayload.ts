import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';

interface UserRepPayload
{
    getFirstName(): string;
    getLastName(): string;
    getEmail(): string;
    getBirthday(): string;
    getDocumentType(): string;
    getDocumentNumber(): string;
    getGender(): string;
    getPhone(): string;
    getCountry(): string;
    getAddress(): string;
    getPassword(): string;
    getPasswordConfirmation(): string;
    getEnable(): boolean;
    getRoles(): IRoleDomain[];
    getPermissions(): string[];
    getConfirmationToken(): null;
    getPasswordRequestedAt(): null;
    getIsSuperAdmin(): boolean;
}

export default UserRepPayload;
