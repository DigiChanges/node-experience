import { filesystem } from '../../../index';
import FileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/DownloadPayload';
import internal from "stream";

class DownloadUseCase
{
    async handle(payload: FileRepPayload): Promise<internal.Readable>
    {
        const filename = payload.getFilename();

        return await filesystem.downloadStreamFile(filename);
    }
}

export default DownloadUseCase;