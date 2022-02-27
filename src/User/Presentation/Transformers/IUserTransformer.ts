import IRoleTransformer from '../../../Role/Presentation/Transformers/IRoleTransformer';
import BaseTransformer, { BasePropertiesTransformer } from '../../../App/Presentation/Transformers/BaseTransformer';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';

type IUserTransformer = BaseTransformer<IUserDomain> & BasePropertiesTransformer &
{
    roles: IRoleTransformer[];
}

export default IUserTransformer;
