import IFileDomain from '../../Domain/Entities/IFileDomain';
import BaseTransformer, { BasePropertiesTransformer } from '../../../App/Presentation/Transformers/BaseTransformer';

type IFileTransformer = BaseTransformer<IFileDomain> & BasePropertiesTransformer;

export default IFileTransformer;
