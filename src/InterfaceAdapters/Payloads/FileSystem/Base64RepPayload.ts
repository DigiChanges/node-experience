
interface Base64RepPayload
{
    data(): object,
    filename(): string,
    base64(): {[key: string]: string},
}

export default Base64RepPayload