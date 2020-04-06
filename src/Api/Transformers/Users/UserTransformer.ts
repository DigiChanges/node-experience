import Transformer from "../../../Lib/Transformer";
import User from "../../../Entities/User";

class UserTransformer extends Transformer
{
    public transform(user: User)
    {
        return {
          'id': user.getId(),
          'email': user.getEmail(),
          'enable': user.isEnable(),
          'createdAt': user.getCreatedAt(),
          'updatedAt': user.getUpdatedAt(),
        };
    }
}

export default UserTransformer;