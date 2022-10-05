import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import BaseTransformer, { BasePropertiesTransformer } from '../../../Shared/Presentation/Transformers/BaseTransformer';

type IFileTransformer = BaseTransformer<IFileVersionDomain> & BasePropertiesTransformer;

export default IFileTransformer;
