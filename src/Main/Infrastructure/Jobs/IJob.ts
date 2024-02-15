
interface IJob<T>
{
    name: string;
    execute(content: T): Promise<void>;
}

export default IJob;
