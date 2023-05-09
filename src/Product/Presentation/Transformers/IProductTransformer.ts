import IProductDomain from '../../Domain/Entities/IProductDomain';
import BaseTransformer, { BasePropertiesTransformer } from '../../../Shared/Presentation/Transformers/BaseTransformer';

type IProductTransformer = BaseTransformer<IProductDomain> & BasePropertiesTransformer;

export default IProductTransformer;
