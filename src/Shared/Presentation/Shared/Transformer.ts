
abstract class Transformer
{
    abstract transform(data: any): Promise<any>;
    async handle(data: any): Promise<any>
    {
        let result: any[] | any = [];

        if (typeof data[Symbol.iterator] === 'function')
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

    async validate<T = any>(value: any, transformer: Transformer | null = null, returnNull = true): Promise<T | null | undefined>
    {
        const valid = !!(value);

        if (transformer)
        {
            return valid ? await transformer.handle(value) : (returnNull ? null : undefined);
        }

        return valid ? value : (returnNull ? null : undefined);
    }
}

export default Transformer;
