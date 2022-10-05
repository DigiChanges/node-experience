import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import BaseTransformer, { BasePropertiesTransformer } from '../../../Shared/Presentation/Transformers/BaseTransformer';

type IFileVersionTransformer = BaseTransformer<IFileVersionDomain> & BasePropertiesTransformer;

export default IFileVersionTransformer;
