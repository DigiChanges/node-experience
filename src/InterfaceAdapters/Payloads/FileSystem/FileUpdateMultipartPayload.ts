import IdPayload from "../Defaults/IdPayload";
import MultipartFileRepPayload from "./MultipartFileRepPayload";

interface FileUpdateMultipartPayload extends IdPayload, MultipartFileRepPayload {}

export default FileUpdateMultipartPayload