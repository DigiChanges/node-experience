import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface CategoryRepPayload
{
    title: string;
    enable: boolean;
    createdBy: IUserDomain;
}

export default CategoryRepPayload;
