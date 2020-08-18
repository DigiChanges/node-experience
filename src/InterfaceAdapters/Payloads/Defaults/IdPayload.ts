import { ObjectID } from "mongodb";

interface IdPayload
{
    id(): ObjectID;
}

export default IdPayload