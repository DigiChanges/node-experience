import FileService from '../Services/FileService';
import { ICriteria } from '../../../Main/Domain/Criteria';
import ResponsePayload from '../../../Shared/Utils/ResponsePayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';

class ListFilesUseCase
{
    private fileService = new FileService();

    async handle(payload: ICriteria): Promise<ResponsePayload<IFileVersionDomain>>
    {
        return await this.fileService.list(payload);
    }
}

export default ListFilesUseCase;
