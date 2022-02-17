import { Transformer } from '@digichanges/shared-experience';

class DefaultTransformer extends Transformer
{
    public async transform(data: any)
    {
        return data;
    }
}

export default DefaultTransformer;
