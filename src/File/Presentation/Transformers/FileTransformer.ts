import moment from 'moment';
import {Transformer} from '@digichanges/shared-experience';

import IFileDomain from '../../InterfaceAdapters/IFileDomain';

class FileTransformer extends Transformer
{
    transform(file: IFileDomain)
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
            createdAt: moment(file.createdAt).utc().unix(),
            updatedAt: moment(file.updatedAt).utc().unix()
        };
    }
}

export default FileTransformer;