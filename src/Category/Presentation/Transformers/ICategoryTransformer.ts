import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import BaseTransformer, { BasePropertiesTransformer } from '../../../Shared/Presentation/Transformers/BaseTransformer';

type ICategoryTransformer = BaseTransformer<ICategoryDomain> & BasePropertiesTransformer;

export default ICategoryTransformer;
