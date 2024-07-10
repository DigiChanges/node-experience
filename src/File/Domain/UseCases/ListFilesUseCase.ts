import FileService from '../Services/FileService';
import { ICriteria } from '../../../Main/Domain/Criteria';
import { IPaginator } from '../../../Main/Domain/Criteria/IPaginator';

class ListFilesUseCase
{
    constructor(private fileService: FileService)
    {}

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.fileService.list(payload);
    }
}

export default ListFilesUseCase;
