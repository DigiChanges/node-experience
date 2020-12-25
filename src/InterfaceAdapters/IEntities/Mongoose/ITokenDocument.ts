import {Document} from "mongoose";
import ITokenDomain from "../../IInfraestructure/ITokenDomain";

interface ITokenDocument extends Document, ITokenDomain {}

export default ITokenDocument;
