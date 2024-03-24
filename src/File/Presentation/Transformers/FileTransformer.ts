import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IFileDTO from '../../Domain/Models/IFileDTO';
import IFileTransformer from './IFileTransformer';
import { Transformer } from '../../../Main/Presentation/Transformers';

class FileTransformer extends Transformer
{
    constructor()
    {
        super();
    }
    public async transform(fileDto: IFileDTO): Promise<IFileTransformer>
    {
        dayjs.extend(utc);

        return {
            id: fileDto.file.getId(),
            currentVersion: fileDto.file.currentVersion,
            createdAt: dayjs(fileDto.file.createdAt).utc().unix(),
            updatedAt: dayjs(fileDto.file.updatedAt).utc().unix()
        };
    }
}

export default FileTransformer;
