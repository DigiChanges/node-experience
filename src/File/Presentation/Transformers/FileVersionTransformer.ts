import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import IFileVersionTransformer from './IFileVersionTransformer';
import { Transformer } from '../../../Main/Presentation/Transformers';

class FileVersionTransformer extends Transformer
{
    public async transform(fileVersion: IFileVersionDomain): Promise<IFileVersionTransformer>
    {
        dayjs.extend(utc);
        return {
            id: fileVersion.getId(),
            name: fileVersion.name,
            originalName: fileVersion.originalName,
            extension: fileVersion.extension,
            path: fileVersion.path,
            mimeType: fileVersion.mimeType,
            size: fileVersion.size,
            version: fileVersion.version,
            isPublic: fileVersion.isPublic,
            isOptimized: fileVersion.isOptimized,
            createdAt: dayjs(fileVersion.createdAt).utc().unix(),
            updatedAt: dayjs(fileVersion.updatedAt).utc().unix()
        };
    }
}

export default FileVersionTransformer;
