import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ICategoryRepPayload from '../Payloads/CategoryRepPayload';

interface ICategoryDomain extends IBaseDomain, ICategoryRepPayload
{
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}

export default ICategoryDomain;
