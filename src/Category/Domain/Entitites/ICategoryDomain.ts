import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import CategoryRepPayload from '../Payloads/CategoryRepPayload';

interface ICategoryDomain extends IBaseDomain, CategoryRepPayload {
  createdBy: IUserDomain;
  lastModifiedBy: IUserDomain;
}

export default ICategoryDomain;
