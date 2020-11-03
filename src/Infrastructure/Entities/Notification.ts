import INotificationDomain from "../../InterfaceAdapters/IInfraestructure/INotificationDomain";
import { v4 as uuidv4 } from 'uuid';

class Notification implements INotificationDomain
{
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuidv4();
    }

    getId(): string
    {
        return this._id;
    }
}

export default Notification;