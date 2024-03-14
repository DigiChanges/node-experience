import { ICriteria } from '@digichanges/shared-experience';
import { IPaginator } from '@digichanges/shared-experience';
import FileService from '../Services/FileService';

class ListFilesUseCase
{
    private fileService = new FileService();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.fileService.list(payload);
    }
}

export default ListFilesUseCase;
