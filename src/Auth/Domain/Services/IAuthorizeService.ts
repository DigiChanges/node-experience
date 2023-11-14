
interface IAuthorizeService
{
    authorize(token: string): Promise<void>
}

export default IAuthorizeService;
