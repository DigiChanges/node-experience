import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import FileService from '../Services/FileService';

class GetFileMetadataUserCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileDomain>
    {
        const id = payload.getId();
        return await this.fileService.getOne(id);
    }
}

export default GetFileMetadataUserCase;
