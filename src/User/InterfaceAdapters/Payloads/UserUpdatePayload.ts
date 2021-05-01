import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';

interface UserUpdatePayload extends IdPayload
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
    getTokenUserId(): string;
    getPermissions(): string[];
}

export default UserUpdatePayload;
