import { filesystem } from '../../../index';
import ListObjectsPayload from '../../../InterfaceAdapters/Payloads/FileSystem/ListObjectsPayload';


class ListObjectsUseCase
{
    async handle(payload: ListObjectsPayload): Promise<any>
    {
        return await filesystem.listObjects(payload.getPrefix(), payload.getRecursive());
    }
}

export default ListObjectsUseCase;