import { filesystem } from '../../../index';
import DownloadPayload from '../../../InterfaceAdapters/Payloads/FileSystem/DownloadPayload';


class GetPresignedGetObjectUseCase
{
    async handle(payload: DownloadPayload): Promise<string>
    {
        const filename = payload.filename();

        return await filesystem.presignedGetObject(filename);

    }
}

export default GetPresignedGetObjectUseCase;