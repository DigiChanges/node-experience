import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface ItemRepPayload
{
    name: string;
    type: number;
    createdBy: IUserDomain;
}

export default ItemRepPayload;
