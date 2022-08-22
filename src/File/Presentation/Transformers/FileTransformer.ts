import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import IFileDomain from '../../Domain/Entities/IFileDomain';
import IFileTransformer from './IFileTransformer';

class FileTransformer extends Transformer
{
    public async transform(file: IFileDomain): Promise<IFileTransformer>
    {
        dayjs.extend(utc);
        return {
            id: file.getId(),
            name: file.name,
            originalName: file.originalName,
            extension: file.extension,
            path: file.path,
            mimeType: file.mimeType,
            size: file.size,
            version: file.version,
            isPublic: file.isPublic,
            createdAt: dayjs(file.createdAt).utc().unix(),
            updatedAt: dayjs(file.updatedAt).utc().unix()
        };
    }
}

export default FileTransformer;
