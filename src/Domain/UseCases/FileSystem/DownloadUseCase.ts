import { filesystem } from '../../../index';
import DownloadPayload from '../../../InterfaceAdapters/Payloads/FileSystem/DownloadPayload';
import internal from "stream";

class DownloadUseCase
{
    async handle(payload: DownloadPayload): Promise<internal.Readable>
    {
        const filename = payload.filename();

        return await filesystem.downloadStreamFile(filename);
    }
}

export default DownloadUseCase;