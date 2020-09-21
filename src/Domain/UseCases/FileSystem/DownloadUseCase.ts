import { filesystem } from '../../../index';
import DownloadFileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/DownloadFileRepPayload';
import internal from "stream";

class DownloadUseCase
{
    async handle(payload: DownloadFileRepPayload): Promise<internal.Readable>
    {
        const filename = payload.getName();

        return await filesystem.downloadStreamFile(filename);
    }
}

export default DownloadUseCase;