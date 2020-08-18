import {Document} from "mongoose";
import IUserDomain from "../../IDomain/IUserDomain";

interface IUserDocument extends Document, IUserDomain {}

export default IUserDocument;
