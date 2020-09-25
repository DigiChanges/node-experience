import moment from "moment";
import Transformer from "../../Shared/Transformer";

class ObjectTransformer extends Transformer
{
    transform(object: any)
    {
        return {
            'name': object.name,
            'lastModified': moment(object.lastModified).utc().unix(),
            'etag': object.etag,
            'size': object.size,
        };
    }    
}

export default ObjectTransformer;