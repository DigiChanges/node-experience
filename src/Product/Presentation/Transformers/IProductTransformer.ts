import BaseTransformer, { BasePropertiesTransformer } from '../../../Shared/Presentation/Transformers/BaseTransformer';
import IProductDomain from '../../Domain/Entities/IProductDomain';

type IProductTransformer = BaseTransformer<IProductDomain> & BasePropertiesTransformer;

export default IProductTransformer;
