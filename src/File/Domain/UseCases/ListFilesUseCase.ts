import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import FileService from '../Services/FileService';

class ListFilesUseCase
{
    private file_service = new FileService();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.file_service.list(payload);
    }
}

export default ListFilesUseCase;
