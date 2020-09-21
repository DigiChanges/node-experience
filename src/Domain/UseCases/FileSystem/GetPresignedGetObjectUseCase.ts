import { filesystem } from '../../../index';
import DownloadFileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/DownloadFileRepPayload';


class GetPresignedGetObjectUseCase
{
    async handle(payload: DownloadFileRepPayload): Promise<string>
    {
        const filename = payload.getName();

        return await filesystem.presignedGetObject(filename);

    }
}

export default GetPresignedGetObjectUseCase;