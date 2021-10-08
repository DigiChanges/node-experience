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
            createdAt: moment(file.createdAt).utc().unix(),
            updatedAt: moment(file.updatedAt).utc().unix()
        };
    }
}

export default FileTransformer;
