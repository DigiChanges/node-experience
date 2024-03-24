import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import { BasePropertiesTransformer, BaseTransformer } from '../../../Main/Presentation/Transformers';

type IFileVersionTransformer = BaseTransformer<IFileVersionDomain> & BasePropertiesTransformer;

export default IFileVersionTransformer;
