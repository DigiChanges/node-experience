import moment from 'moment';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

class ObjectTransformer extends Transformer
{
    public async transform(object: any)
    {
        return {
            name: object.name,
            lastModified: moment(object.lastModified).utc().unix(),
            etag: object.etag,
            size: object.size
        };
    }
}

export default ObjectTransformer;
