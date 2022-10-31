import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface ItemRepPayload
{
    name: string;
    type: number;
    authUser: IUserDomain;
}

export default ItemRepPayload;
