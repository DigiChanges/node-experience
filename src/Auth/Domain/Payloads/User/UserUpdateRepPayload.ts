
interface UserUpdateRepPayload
{
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    gender: string;
    phone: string;
    country: string;
    emailVerified: boolean;
}

export default UserUpdateRepPayload;
