import BaseTransformer, { BasePropertiesTransformer } from '../../../App/Presentation/Transformers/BaseTransformer';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';

type IRoleTransformer = BaseTransformer<IRoleDomain> & BasePropertiesTransformer;

export default IRoleTransformer;
