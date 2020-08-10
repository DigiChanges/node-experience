import {Document} from "mongoose";
import IItemDomain from "../../IDomain/IItemDomain";

interface IItemDocument extends Document, IItemDomain {}

export default IItemDocument;
