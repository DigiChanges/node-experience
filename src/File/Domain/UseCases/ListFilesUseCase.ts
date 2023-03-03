import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
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
