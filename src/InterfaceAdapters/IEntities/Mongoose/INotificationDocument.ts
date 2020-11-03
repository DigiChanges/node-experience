import {Document} from "mongoose";
import INotificationDomain from "../../IInfraestructure/INotificationDomain";

interface INotificationDocument extends Document, INotificationDomain {}

export default INotificationDocument;