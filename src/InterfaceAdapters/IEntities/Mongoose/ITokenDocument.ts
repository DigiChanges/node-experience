import {Document} from "mongoose";
import ITokenDomain from "../../IInfrastructure/ITokenDomain";

interface ITokenDocument extends Document, ITokenDomain {}

export default ITokenDocument;
