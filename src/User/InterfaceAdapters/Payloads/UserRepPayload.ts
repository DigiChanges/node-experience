import IRoleDomain from '../../../Role/Domain/Entities/IRoleDomain';

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
    getEnable(): boolean;
    getRoles(): IRoleDomain[];
    getPermissions(): string[];
    getConfirmationToken(): Promise<string>;
    getPasswordRequestedAt(): null;
    getIsSuperAdmin(): boolean;
}

export default UserRepPayload;
