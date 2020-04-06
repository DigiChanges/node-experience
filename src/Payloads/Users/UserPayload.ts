import User from "../../Entities/User";

interface UserPayload {
    user(): User;
}

export default UserPayload