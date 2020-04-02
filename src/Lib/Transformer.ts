
abstract class Transformer
{
    abstract transform(data: any): any;
    handle(data: any): any
    {
        let result = null;

        if (data instanceof Array)
        {
            result = data.map((element: any) => {
                return this.transform(element);
            });
        }
        else
        {
            result = this.transform(data);
        }

        return result;
    }
}

export default Transformer;