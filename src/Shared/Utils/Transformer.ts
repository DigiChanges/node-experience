
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
}

export default Transformer;
