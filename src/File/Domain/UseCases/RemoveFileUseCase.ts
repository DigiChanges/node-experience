import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FileService from '../Services/FileService';

class RemoveFileUseCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileDomain>
    {
        const id = payload.getId();
        return this.fileService.removeFile(id);
    }
}

export default RemoveFileUseCase;
