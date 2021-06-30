
interface IReqDTO
{
    headers: Record<string, any>;
    url: string;
    params: Record<string, any>;
    query: Record<string, any>;
    body: Record<string, any>;
}

export default IReqDTO;