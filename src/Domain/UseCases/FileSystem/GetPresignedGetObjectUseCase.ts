import { filesystem } from '../../../index';
import FileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/DownloadPayload';


class GetPresignedGetObjectUseCase
{
    async handle(payload: FileRepPayload): Promise<string>
    {
        const filename = payload.getFilename();

        return await filesystem.presignedGetObject(filename);

    }
}

export default GetPresignedGetObjectUseCase;