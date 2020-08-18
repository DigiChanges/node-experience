import {Document} from "mongoose";
import IRoleDomain from "../../IDomain/IRoleDomain";

interface IRoleDocument extends Document, IRoleDomain {}

export default IRoleDocument;
