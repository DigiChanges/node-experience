
export abstract class Transformer<T = unknown, P = unknown>
{
    abstract transform(data: T): Promise<P>;

    async handle(data: T | T[]): Promise<P | P[]>
    {
        let result: P[] | P = [];

        if (Array.isArray(data))
        {
            for await (const element of data)
            {
                result.push(await this.transform(element));
            }
        }
        else
        {
            result = await this.transform(data);
        }

        return result;
    }
}
