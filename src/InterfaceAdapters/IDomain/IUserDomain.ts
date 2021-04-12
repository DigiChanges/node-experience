import IRoleDomain from './IRoleDomain';

interface IUserDomain
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
    password: string;
    roles: IRoleDomain[];
    permissions: string[];
    enable: boolean;
    isSuperAdmin: boolean;
    confirmationToken: string;
    passwordRequestedAt: Date;
    createdAt: Date;
    updatedAt: Date;

    getFullName(): string;
    setRole(role: IRoleDomain): void;
    getRoles(): IRoleDomain[];
    clearRoles(): void;
    getId(): string;
}

export default IUserDomain;
