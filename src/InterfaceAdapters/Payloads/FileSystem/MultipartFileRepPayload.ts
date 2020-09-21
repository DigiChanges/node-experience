import FileRepPayload from "./FileRepPayload";

interface MultipartFileRepPayload extends FileRepPayload
{
    getFile(): Express.Multer.File
}

export default MultipartFileRepPayload