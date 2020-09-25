import internal from "stream";
import IFileDomain from "../../IDomain/IFileDomain";

interface IFileDTO
{
    getMetadata(): IFileDomain;
    getStream(): internal.Readable;
}

export default IFileDTO;