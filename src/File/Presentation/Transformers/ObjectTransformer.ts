import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Transformer } from '@digichanges/shared-experience';

class ObjectTransformer extends Transformer
{
    public async transform(object: any)
    {
        dayjs.extend(utc);
        return {
            name: object.name,
            lastModified: dayjs(object.lastModified).utc().unix(),
            etag: object.etag,
            size: object.size
        };
    }
}

export default ObjectTransformer;
