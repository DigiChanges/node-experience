import { filesystem } from '../../../index';
import DownloadPayload from '../../../InterfaceAdapters/Payloads/FileSystem/DownloadPayload';
import internal from "stream";

class GetFileSystemWithPathUseCase
{
    async handle(payload: DownloadPayload): Promise<string>
    {
        const filename = payload.filename();

        return await filesystem.downloadFile(filename);
    }
}

export default GetFileSystemWithPathUseCase;