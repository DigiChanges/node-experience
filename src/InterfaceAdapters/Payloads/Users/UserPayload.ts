import User from "../../../Infrastructure/Entities/User";

interface UserPayload {
    user(): User;
}

export default UserPayload