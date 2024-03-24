import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import { BasePropertiesTransformer, BaseTransformer } from '../../../Main/Presentation/Transformers';

interface IFileData
{
    currentVersion: number;
    versions: IFileVersionDomain[];
}

type IFileTransformer = BaseTransformer<IFileData> & BasePropertiesTransformer;

export default IFileTransformer;
