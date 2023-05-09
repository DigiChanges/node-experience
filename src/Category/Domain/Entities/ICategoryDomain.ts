
import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import CategoryRepPayload from '../Payloads/CategoryRepPayload';

interface ICategoryDomain extends IBaseDomain, CategoryRepPayload{
    updateBuild(payload: CategoryRepPayload): void
}

export default ICategoryDomain;
