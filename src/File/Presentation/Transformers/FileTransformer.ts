import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import IFileTransformer from './IFileTransformer';

class FileTransformer extends Transformer
{
    public async transform(fileVersion: IFileVersionDomain): Promise<IFileTransformer>
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
            file: fileVersion.file,
            createdAt: dayjs(fileVersion.createdAt).utc().unix(),
            updatedAt: dayjs(fileVersion.updatedAt).utc().unix()
        };
    }
}

export default FileTransformer;
