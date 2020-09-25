import internal from "stream";
import IFileDomain from "../../IDomain/IFileDomain";
import IFileDTO from "./IFileDTO";

class FileDTO implements IFileDTO
{
    private metadata: IFileDomain;
    private stream: internal.Readable;

    constructor( metadata: IFileDomain, stream: internal.Readable )
    {
        this.metadata = metadata;
        this.stream = stream;
    }

    getMetadata(): IFileDomain
    {
        return this.metadata;
    }

    getStream(): internal.Readable
    {
        return this.stream;
    }

}

export default FileDTO;