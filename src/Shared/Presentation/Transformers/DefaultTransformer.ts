import Transformer from '../../Utils/Transformer';

class DefaultTransformer extends Transformer
{
    public async transform(data: any)
    {
        return data;
    }
}

export default DefaultTransformer;
