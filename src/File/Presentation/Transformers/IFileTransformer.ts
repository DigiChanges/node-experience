import IFileDomain from '../../Domain/Entities/IFileDomain';
import BaseTransformer, { BasePropertiesTransformer } from '../../../Shared/Presentation/Transformers/BaseTransformer';

type IFileTransformer = BaseTransformer<IFileDomain> & BasePropertiesTransformer;

export default IFileTransformer;
