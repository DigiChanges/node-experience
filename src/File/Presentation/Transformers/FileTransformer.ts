import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import IFileTransformer from '../../InterfaceAdapters/IFileTransformer';

class FileTransformer extends Transformer
{
    transform(file: IFileDomain): IFileTransformer
    {
        return {
            id: file.get_id(),
            name: file.name,
            originalName: file.original_name,
            extension: file.extension,
            path: file.path,
            mimeType: file.mime_type,
            size: file.size,
            version: file.version,
            createdAt: moment(file.created_at).utc().unix(),
            updatedAt: moment(file.updated_at).utc().unix()
        };
    }
}

export default FileTransformer;
