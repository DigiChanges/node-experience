
interface IJob<T>
{
    execute(content: T): Promise<void>;
}

export default IJob;
