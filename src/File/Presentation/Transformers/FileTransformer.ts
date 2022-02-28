import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IFileDomain from '../../Domain/Entities/IFileDomain';
import IFileTransformer from './IFileTransformer';

class FileTransformer extends Transformer
{
    public async transform(file: IFileDomain): Promise<IFileTransformer>
    {
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
            createdAt: moment(file.createdAt).utc().unix(),
            updatedAt: moment(file.updatedAt).utc().unix()
        };
    }
}

export default FileTransformer;
