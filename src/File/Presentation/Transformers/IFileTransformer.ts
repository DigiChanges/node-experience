import BaseTransformer, { BasePropertiesTransformer } from '../../../Shared/Presentation/Transformers/BaseTransformer';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';

interface IFileData {
    currentVersion: number;
    versions: IFileVersionDomain[];
}

type IFileTransformer = BaseTransformer<IFileData> & BasePropertiesTransformer;

export default IFileTransformer;
