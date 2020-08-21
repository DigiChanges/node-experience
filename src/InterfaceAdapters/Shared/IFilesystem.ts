import internal from "stream";

interface IFilesystem
{
    uploadFileByBuffer(objectName: string, base64Data: string): Promise<any>;
    downloadFile(objectName: string): Promise<string>;
    getClient(): any;
}

export default IFilesystem;