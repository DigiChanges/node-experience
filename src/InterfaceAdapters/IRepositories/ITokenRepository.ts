
interface ITokenRepository
{
    save(element: any): Promise<any>;
    getOne(id: string): Promise<any>;
    update(element: any): Promise<any>
}

export default ITokenRepository;
