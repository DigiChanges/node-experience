
interface ITokenRepository<T>
{
    save(element: Record<string, any>): Promise<T>;
    getOne(id: string): Promise<T>;
    update(element: Record<string, any>): Promise<T>
}

export default ITokenRepository;
