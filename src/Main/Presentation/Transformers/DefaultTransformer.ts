import { Transformer } from './Transformer';

export class DefaultTransformer extends Transformer<string, string>
{
    public async transform(data: any)
    {
        return data;
    }
}
