
interface IUser
{
    _id: any;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: string[];
    permissions: string[];
    enable: boolean;
    isSuperAdmin: boolean;
    confirmationToken: string ;
    passwordRequestedAt: Date ;
    createdAt: Date;
    updatedAt: Date;
}

export default IUser;
