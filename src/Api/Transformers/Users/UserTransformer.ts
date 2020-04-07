import Transformer from "../../../Lib/Transformer";
import User from "../../../Entities/User";
import moment from "moment";

class UserTransformer extends Transformer
{
    public transform(user: User)
    {
        return {
            'id': user.getId(),
            'email': user.getEmail(),
            'enable': user.isEnable(),
            'createdAt': moment(user.getCreatedAt()).format('DD-MM-YYYY HH:SS'),
            'updatedAt': moment(user.getUpdatedAt()).format('DD-MM-YYYY HH:SS'),
        };
    }
}

export default UserTransformer;