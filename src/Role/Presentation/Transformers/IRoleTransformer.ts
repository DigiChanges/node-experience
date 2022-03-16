import BaseTransformer, { BasePropertiesTransformer } from '../../../App/Presentation/Transformers/BaseTransformer';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';

type IRoleTransformer = BaseTransformer<IRoleDomain> & BasePropertiesTransformer;

export default IRoleTransformer;
