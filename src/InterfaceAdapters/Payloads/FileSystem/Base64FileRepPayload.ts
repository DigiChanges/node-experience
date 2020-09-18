import FileRepPayload from "./FileRepPayload";

interface Base64FileRepPayload extends FileRepPayload
{
    getBase64(): string,
}

export default Base64FileRepPayload