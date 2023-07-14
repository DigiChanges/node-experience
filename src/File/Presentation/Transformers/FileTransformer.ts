import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Transformer } from '@digichanges/shared-experience';
import IFileDTO from '../../Domain/Models/IFileDTO';
import IFileTransformer from './IFileTransformer';
import FileVersionTransformer from './FileVersionTransformer';

class FileTransformer extends Transformer
{
    private fileVersionTransformer: FileVersionTransformer;

    constructor()
    {
        super();
        this.fileVersionTransformer = new FileVersionTransformer();
    }
    public async transform(fileDto: IFileDTO): Promise<IFileTransformer>
    {
        dayjs.extend(utc);

        return {
            id: fileDto.file.getId(),
            currentVersion: fileDto.file.currentVersion,
            versions: await this.fileVersionTransformer.handle(fileDto.versions),
            createdAt: dayjs(fileDto.file.createdAt).utc().unix(),
            updatedAt: dayjs(fileDto.file.updatedAt).utc().unix()
        };
    }
}

export default FileTransformer;
